import { getDayPattern, parseTimeToMinutes } from "./formatting";
import { groupSectionsByDay } from "./timeConflict";
import { buildWalkingWarnings } from "./walking";

function clamp(value, min = 0, max = 100) {
  return Math.min(max, Math.max(min, value));
}

function average(values) {
  if (!values.length) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function professorQualityScore(sections) {
  return clamp(average(sections.map((section) => (section.rating / 5) * 100)));
}

function walkingFeasibilityScore(warnings) {
  if (!warnings.length) {
    return 100;
  }

  const penalties = warnings.reduce((total, warning) => {
    if (warning.severity === "sprint") {
      return total + 35;
    }
    if (warning.severity === "tight") {
      return total + 15;
    }
    return total + Math.max(0, warning.walkMinutes - Math.max(0, warning.gapMinutes - 10));
  }, 0);

  return clamp(100 - penalties / warnings.length);
}

function workloadBalanceScore(sections) {
  const grouped = groupSectionsByDay(sections);
  const totals = Object.values(grouped).map((daySections) =>
    daySections.reduce((sum, section) => sum + (section.endMinutes - section.startMinutes), 0),
  );
  const activeTotals = totals.filter(Boolean);

  if (!activeTotals.length) {
    return 0;
  }

  const mean = average(activeTotals);
  const variance = average(activeTotals.map((value) => (value - mean) ** 2));
  const stdev = Math.sqrt(variance);
  const longDayPenalty = activeTotals.reduce((penalty, total) => penalty + Math.max(0, total - 240) / 6, 0);

  return clamp(100 - stdev / 2 - longDayPenalty);
}

function timePreferenceScore(sections, preferences, warnings) {
  let score = 100;
  const dayPatterns = sections.map((section) => getDayPattern(section.days));
  const grouped = groupSectionsByDay(sections);
  const activeDays = Object.values(grouped).filter((day) => day.length > 0).length;

  sections.forEach((section) => {
    const start = parseTimeToMinutes(section.start);
    const end = parseTimeToMinutes(section.end);

    if (start < preferences.earliestStart) {
      score -= Math.ceil((preferences.earliestStart - start) / 10);
    }

    if (end > preferences.latestEnd) {
      score -= Math.ceil((end - preferences.latestEnd) / 10);
    }
  });

  if (preferences.wantFridaysOff) {
    if (grouped.F.length === 0) {
      score += 12;
    } else {
      const fridayMinutes = grouped.F.reduce((sum, section) => sum + (section.endMinutes - section.startMinutes), 0);
      score -= 30;
      score -= grouped.F.length * 8;
      score -= Math.round(fridayMinutes / 20);
    }
  }

  if (preferences.dayPattern === "TTH") {
    score += dayPatterns.filter((pattern) => pattern === "TTH").length * 4;
    score -= dayPatterns.filter((pattern) => pattern === "MWF").length * 2;
  }

  if (preferences.dayPattern === "MWF") {
    score += dayPatterns.filter((pattern) => pattern === "MWF").length * 4;
    score -= dayPatterns.filter((pattern) => pattern === "TTH").length * 2;
  }

  if (preferences.preferTimeOfDay === "morning") {
    score += sections.filter((section) => parseTimeToMinutes(section.start) < 720).length * 3;
  }

  if (preferences.preferTimeOfDay === "afternoon") {
    score += sections.filter((section) => parseTimeToMinutes(section.start) >= 720).length * 3;
  }

  if (preferences.avoidBackToBack) {
    score -= warnings.filter((warning) => warning.gapMinutes <= 10).length * 10;
  }

  if (preferences.minimizeDaysOnCampus) {
    score += (5 - activeDays) * 4;
  }

  return clamp(score);
}

function seatAvailabilityScore(sections) {
  return clamp(
    average(
      sections.map((section) => {
        const openSeatRatio = Math.max(0, section.seats - section.enrolled) / section.seats;
        return openSeatRatio * 100;
      }),
    ) * 1.5,
  );
}

function buildWeights(preferences) {
  return {
    professorQuality: 18 + preferences.prioritizeProfessorRating * 4,
    walkingFeasibility: 18 + preferences.minimizeWalking * 4,
    workloadBalance: 18 + (preferences.avoidBackToBack ? 8 : 0),
    timePreference: 18 + (preferences.wantFridaysOff ? 16 : 0) + (preferences.minimizeDaysOnCampus ? 6 : 0),
    seatAvailability: 18,
  };
}

export function scoreSchedule(sections, preferences) {
  const warnings = buildWalkingWarnings(sections);
  const scores = {
    professorQuality: Math.round(professorQualityScore(sections)),
    walkingFeasibility: Math.round(walkingFeasibilityScore(warnings)),
    workloadBalance: Math.round(workloadBalanceScore(sections)),
    timePreference: Math.round(timePreferenceScore(sections, preferences, warnings)),
    seatAvailability: Math.round(seatAvailabilityScore(sections)),
  };

  const weights = buildWeights(preferences);
  const weightTotal = Object.values(weights).reduce((sum, value) => sum + value, 0);
  const composite = Math.round(
    Object.entries(scores).reduce((sum, [key, value]) => sum + value * weights[key], 0) / weightTotal,
  );

  return {
    scores,
    composite,
    walkingWarnings: warnings,
  };
}
