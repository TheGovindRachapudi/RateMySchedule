import { parseDays, parseTimeToMinutes } from "./formatting";

function overlaps(startA, endA, startB, endB) {
  return startA < endB && startB < endA;
}

export function sectionsConflict(sectionA, sectionB) {
  const daysA = parseDays(sectionA.days);
  const daysB = parseDays(sectionB.days);
  const sharedDays = daysA.filter((day) => daysB.includes(day));

  if (!sharedDays.length) {
    return false;
  }

  const startA = parseTimeToMinutes(sectionA.start);
  const endA = parseTimeToMinutes(sectionA.end);
  const startB = parseTimeToMinutes(sectionB.start);
  const endB = parseTimeToMinutes(sectionB.end);

  return overlaps(startA, endA, startB, endB);
}

export function combinationHasConflict(sections) {
  for (let index = 0; index < sections.length; index += 1) {
    for (let compareIndex = index + 1; compareIndex < sections.length; compareIndex += 1) {
      if (sectionsConflict(sections[index], sections[compareIndex])) {
        return true;
      }
    }
  }
  return false;
}

export function groupSectionsByDay(sections) {
  const grouped = {
    M: [],
    T: [],
    W: [],
    TH: [],
    F: []
  };

  sections.forEach((section) => {
    parseDays(section.days).forEach((day) => {
      grouped[day].push({
        ...section,
        startMinutes: parseTimeToMinutes(section.start),
        endMinutes: parseTimeToMinutes(section.end)
      });
    });
  });

  Object.values(grouped).forEach((daySections) => {
    daySections.sort((left, right) => left.startMinutes - right.startMinutes);
  });

  return grouped;
}
