function strongestProfessor(schedule) {
  return [...schedule.sections].sort((left, right) => right.rating - left.rating)[0];
}

function weakestPoint(schedule) {
  const warning = schedule.walkingWarnings.find((item) => item.severity === "sprint") || schedule.walkingWarnings.find((item) => item.severity === "tight");
  if (warning) {
    return `The main tradeoff is the ${warning.day} ${warning.fromCourse} to ${warning.toCourse} transition, where a ${warning.walkMinutes}-minute walk meets a ${warning.gapMinutes}-minute gap.`;
  }

  const lowestScore = Object.entries(schedule.scores).sort((left, right) => left[1] - right[1])[0];
  if (lowestScore) {
    const labels = {
      professorQuality: "professor quality",
      walkingFeasibility: "walking comfort",
      workloadBalance: "workload balance",
      timePreference: "time preference fit",
      seatAvailability: "seat availability",
    };
    return `Its biggest compromise is ${labels[lowestScore[0]]}, which landed at ${lowestScore[1]}/100.`;
  }

  return "It is balanced across the board with no major penalties.";
}

function hasFridaysOff(schedule) {
  return schedule.sections.every((section) => !section.days.includes("F"));
}

function buildNicknameCandidates(schedule) {
  const candidates = [];
  const { scores } = schedule;
  const fridayFree = hasFridaysOff(schedule);

  if (fridayFree) {
    candidates.push("Friday Freedom");
  }

  if (scores.professorQuality >= 90) {
    candidates.push("The Professor Stack");
  }

  if (scores.walkingFeasibility >= 88) {
    candidates.push("The Short Walk");
  }

  if (scores.workloadBalance >= 92) {
    candidates.push("The Even Week");
  }

  if (scores.seatAvailability >= 60) {
    candidates.push("The Safe Seats Pick");
  }

  if (scores.timePreference >= 90 && !fridayFree) {
    candidates.push("The Clean Window");
  }

  candidates.push("The Balanced Pick");
  candidates.push("The Smart Mix");
  candidates.push("The Best Fit");

  return [...new Set(candidates)];
}

function pickNickname(schedule, usedNicknames, index) {
  const candidates = buildNicknameCandidates(schedule);
  const available = candidates.find((candidate) => !usedNicknames.has(candidate));

  if (available) {
    usedNicknames.add(available);
    return available;
  }

  const fallback = `Schedule Option ${index + 1}`;
  usedNicknames.add(fallback);
  return fallback;
}

export function explainSchedules(schedules) {
  const usedNicknames = new Set();

  return schedules.map((schedule, index) => {
    const topProfessor = strongestProfessor(schedule);
    const nickname = pickNickname(schedule, usedNicknames, index);
    const summary = `Ranked #${index + 1}, ${nickname.toLowerCase()} finishes at ${schedule.composite}/100. ${topProfessor.courseId} with ${topProfessor.instructor} is the academic highlight at a ${topProfessor.rating.toFixed(1)} rating. ${weakestPoint(schedule)}`;

    return {
      ...schedule,
      nickname,
      emoji: ["A", "B", "C"][index] || "*",
      explanation: summary,
    };
  });
}
