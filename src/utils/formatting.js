export const DAY_ORDER = ["M", "T", "W", "TH", "F"];
export const DAY_LABELS = {
  M: "Monday",
  T: "Tuesday",
  W: "Wednesday",
  TH: "Thursday",
  F: "Friday"
};

export function parseTimeToMinutes(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

export function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const suffix = hours >= 12 ? "PM" : "AM";
  const normalizedHour = hours % 12 || 12;
  return `${normalizedHour}:${String(mins).padStart(2, "0")} ${suffix}`;
}

export function parseDays(days) {
  const parsed = [];
  let index = 0;
  while (index < days.length) {
    if (days.slice(index, index + 2) === "TH") {
      parsed.push("TH");
      index += 2;
      continue;
    }
    parsed.push(days[index]);
    index += 1;
  }
  return parsed;
}

export function sectionLabel(section) {
  return `${section.courseId} · ${section.unique}`;
}

export function formatPercent(value) {
  return `${Math.round(value)}%`;
}

export function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function getDayPattern(days) {
  if (days === "TTH") {
    return "TTH";
  }
  if (days.includes("M") && days.includes("W") && days.includes("F")) {
    return "MWF";
  }
  return "Mixed";
}
