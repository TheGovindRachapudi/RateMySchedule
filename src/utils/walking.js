import { BUILDINGS } from "../data/buildings";
import { DAY_ORDER } from "./formatting";
import { groupSectionsByDay } from "./timeConflict";

const EARTH_RADIUS_METERS = 6371000;
const WALKING_SPEED_METERS_PER_MINUTE = 80;

function toRadians(value) {
  return (value * Math.PI) / 180;
}

export function haversineMeters(from, to) {
  if (!from || !to) {
    return 0;
  }

  const latDelta = toRadians(to.lat - from.lat);
  const lngDelta = toRadians(to.lng - from.lng);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);

  const a =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(lngDelta / 2) ** 2;

  return 2 * EARTH_RADIUS_METERS * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export function getWalkMinutesBetweenBuildings(fromCode, toCode) {
  if (!fromCode || !toCode || fromCode === toCode) {
    return 0;
  }

  const distance = haversineMeters(BUILDINGS[fromCode], BUILDINGS[toCode]);
  return Math.round(distance / WALKING_SPEED_METERS_PER_MINUTE);
}

export function buildWalkingWarnings(sections) {
  const grouped = groupSectionsByDay(sections);
  const warnings = [];

  DAY_ORDER.forEach((day) => {
    const daySections = grouped[day];

    for (let index = 0; index < daySections.length - 1; index += 1) {
      const current = daySections[index];
      const next = daySections[index + 1];
      const gapMinutes = next.startMinutes - current.endMinutes;
      const walkMinutes = getWalkMinutesBetweenBuildings(current.building, next.building);
      const severity = walkMinutes > gapMinutes ? "sprint" : gapMinutes - walkMinutes < 5 ? "tight" : "ok";

      warnings.push({
        day,
        from: current.building,
        to: next.building,
        fromCourse: current.courseId,
        toCourse: next.courseId,
        walkMinutes,
        gapMinutes,
        severity
      });
    }
  });

  return warnings;
}
