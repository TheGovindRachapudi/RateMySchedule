import { courses } from "../data/courses";
import { slugify } from "../utils/formatting";
import { scoreSchedule } from "../utils/scoring";
import { combinationHasConflict } from "../utils/timeConflict";

const courseLookup = courses.reduce((lookup, course) => {
  lookup[course.id] = course;
  return lookup;
}, {});

function enrichSection(course, section) {
  return {
    ...section,
    courseId: course.id,
    dept: course.dept,
    courseNumber: course.number,
    title: course.title,
    credits: course.credits,
    flags: course.flags || [],
  };
}

function filterSectionsForPreferences(courseSections, preferences) {
  const strictMatches = courseSections.filter((section) => {
    const [startHours, startMinutes] = section.start.split(":").map(Number);
    const [endHours, endMinutes] = section.end.split(":").map(Number);
    const start = startHours * 60 + startMinutes;
    const end = endHours * 60 + endMinutes;
    return start >= preferences.earliestStart && end <= preferences.latestEnd;
  });

  return {
    sections: strictMatches.length ? strictMatches : courseSections,
    fallbackUsed: strictMatches.length === 0,
  };
}

function cartesianProduct(sectionBuckets, limit = 12000) {
  const results = [];

  function build(index, current) {
    if (results.length >= limit) {
      return;
    }

    if (index === sectionBuckets.length) {
      results.push(current);
      return;
    }

    sectionBuckets[index].forEach((section) => {
      build(index + 1, [...current, section]);
    });
  }

  build(0, []);
  return results;
}

function sectionDifferenceCount(scheduleA, scheduleB) {
  const uniquesA = new Set(scheduleA.sections.map((section) => section.unique));
  return scheduleB.sections.filter((section) => !uniquesA.has(section.unique)).length;
}

function selectDiverseTopSchedules(scoredSchedules, desiredCount = 3) {
  const selected = [];

  scoredSchedules.forEach((schedule) => {
    if (selected.length >= desiredCount) {
      return;
    }

    if (!selected.length || selected.every((existing) => sectionDifferenceCount(existing, schedule) >= 2)) {
      selected.push(schedule);
    }
  });

  return selected.length ? selected : scoredSchedules.slice(0, desiredCount);
}

function sectionHasFriday(section) {
  return section.days.includes("F");
}

function combinationHasFridayClasses(sections) {
  return sections.some((section) => sectionHasFriday(section));
}

function dedupeCourseCombinations(combinations) {
  const seen = new Set();

  return combinations.filter((courseIds) => {
    const key = [...courseIds].sort().join("|");
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function buildCourseCombinations(requiredCourseIds, courseGroups) {
  let combinations = [dedupeCourseCombinations([requiredCourseIds])[0] || []];

  courseGroups.forEach((group) => {
    const validOptions = group.courseIds.filter((courseId) => courseLookup[courseId]);
    if (!validOptions.length) {
      return;
    }

    const nextCombinations = [];

    combinations.forEach((courseIds) => {
      if (courseIds.some((courseId) => validOptions.includes(courseId))) {
        nextCombinations.push(courseIds);
        return;
      }

      validOptions.forEach((courseId) => {
        nextCombinations.push([...courseIds, courseId]);
      });
    });

    combinations = dedupeCourseCombinations(nextCombinations);
  });

  return dedupeCourseCombinations(combinations);
}

function dedupeSectionCombinations(combinations) {
  const seen = new Set();

  return combinations.filter((sections) => {
    const key = sections
      .map((section) => `${section.courseId}:${section.unique}`)
      .sort()
      .join("|");

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function buildDiagnostics({
  fallbackCourseIds,
  validCombinations,
  preferences,
  fridayFreeCombinations,
  fridayLockedCourseIds,
  candidateCombinations,
}) {
  const suggestions = [];

  if (fallbackCourseIds.length) {
    suggestions.push(`Your current time window is tight enough that ${fallbackCourseIds.join(", ")} had to ignore it just to stay in play.`);
  }

  if (preferences.wantFridaysOff) {
    if (fridayFreeCombinations.length > 0) {
      suggestions.push(`Fridays off was enforced. Showing ${fridayFreeCombinations.length} Friday-free schedule combinations only.`);
    } else if (validCombinations.length > 0) {
      suggestions.push("No fully Friday-free schedule exists with the current course mix, so the optimizer fell back to the least Friday-heavy options.");
      if (fridayLockedCourseIds.length) {
        suggestions.push(`These requested courses only have Friday-including sections in the current dataset: ${fridayLockedCourseIds.join(", ")}.`);
      }
    }
  }

  if (!candidateCombinations.length) {
    suggestions.push("No conflict-free schedule survived with the currently selected course set.");

    if (preferences.wantFridaysOff) {
      suggestions.push("Try turning off Fridays off first. That preference often removes the most viable combinations.");
    }

    if (preferences.earliestStart > 8 * 60) {
      suggestions.push("Allowing one earlier class can unlock more combinations, especially for CS and SDS courses.");
    }
  }

  return suggestions;
}

function normalizeRequest(request) {
  if (Array.isArray(request)) {
    return {
      requiredCourseIds: request,
      courseGroups: [],
    };
  }

  return {
    requiredCourseIds: request?.requiredCourseIds || [],
    courseGroups: request?.courseGroups || [],
  };
}

export function generateSchedules(request, preferences) {
  const normalizedRequest = normalizeRequest(request);
  const requiredCourseIds = normalizedRequest.requiredCourseIds.filter((courseId) => courseLookup[courseId]);
  const courseGroups = normalizedRequest.courseGroups || [];
  const requestedCourseCombinations = buildCourseCombinations(requiredCourseIds, courseGroups);

  if (!requestedCourseCombinations.length) {
    return {
      schedules: [],
      stats: {
        requestedCourseCount: 0,
        validCombinations: 0,
        totalCombinations: 0,
        fallbackCourseIds: [],
        fridayFreeCombinations: 0,
        fridayPreferenceSatisfied: false,
        fridayLockedCourseIds: [],
      },
      diagnostics: [],
    };
  }

  const fallbackCourseIds = new Set();
  const fridayLockedCourseIds = new Set();
  const allSectionCombinations = [];
  let totalCombinations = 0;

  requestedCourseCombinations.forEach((courseIds) => {
    const requestedCourses = courseIds.map((courseId) => courseLookup[courseId]).filter(Boolean);

    const sectionBuckets = requestedCourses.map((course) => {
      const filtered = filterSectionsForPreferences(course.sections.map((section) => enrichSection(course, section)), preferences);
      if (filtered.fallbackUsed) {
        fallbackCourseIds.add(course.id);
      }
      if (filtered.sections.every((section) => sectionHasFriday(section))) {
        fridayLockedCourseIds.add(course.id);
      }
      return filtered.sections;
    });

    const combinations = cartesianProduct(sectionBuckets);
    totalCombinations += combinations.length;
    allSectionCombinations.push(...combinations);
  });

  const validCombinations = dedupeSectionCombinations(allSectionCombinations).filter((combination) => !combinationHasConflict(combination));

  let candidateCombinations = validCombinations;
  let fridayFreeCombinations = [];
  let fridayPreferenceSatisfied = false;

  if (preferences.wantFridaysOff) {
    fridayFreeCombinations = validCombinations.filter((combination) => !combinationHasFridayClasses(combination));

    if (fridayFreeCombinations.length > 0) {
      candidateCombinations = fridayFreeCombinations;
      fridayPreferenceSatisfied = true;
    }
  }

  const scored = candidateCombinations
    .map((sections) => {
      const scoring = scoreSchedule(sections, preferences);
      return {
        id: slugify(sections.map((section) => section.unique).join("-")),
        sections,
        ...scoring,
      };
    })
    .sort((left, right) => right.composite - left.composite);

  return {
    schedules: selectDiverseTopSchedules(scored),
    stats: {
      requestedCourseCount: requiredCourseIds.length + courseGroups.length,
      validCombinations: validCombinations.length,
      totalCombinations,
      fallbackCourseIds: [...fallbackCourseIds],
      fridayFreeCombinations: fridayFreeCombinations.length,
      fridayPreferenceSatisfied,
      fridayLockedCourseIds: [...fridayLockedCourseIds],
    },
    diagnostics: buildDiagnostics({
      fallbackCourseIds: [...fallbackCourseIds],
      validCombinations,
      preferences,
      fridayFreeCombinations,
      fridayLockedCourseIds: [...fridayLockedCourseIds],
      candidateCombinations,
    }),
  };
}
