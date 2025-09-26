function verifyDaysAreNumbers(obj) {
  if (obj == null || typeof obj !== "object" || Array.isArray(obj)) return false;

  const expected = { Mon: 1, Tue: 1, Wed: 1, Thu: 1, Fri: 1, Sat: 1, Sun: 1 };
  return Object.keys(expected).every((k) =>
    Object.prototype.hasOwnProperty.call(obj, k) && Number.isFinite(obj[k])
  );
}

export default function verifyStatsData(data) {
  // top-level object check
  if (data == null || typeof data !== "object" || Array.isArray(data)) return false;

  const { week, day } = data;

  // week object + numeric leaves
  const weekOk =
    week != null &&
    typeof week === "object" &&
    !Array.isArray(week) &&
    Number.isFinite(week.ave) &&
    Number.isFinite(week.std);

  if (!weekOk) return false;

  // day object + ave/std sub-objects of numbers for Mon..Sun
  const dayOk =
    day != null &&
    typeof day === "object" &&
    !Array.isArray(day) &&
    verifyDaysAreNumbers(day.ave) &&
    verifyDaysAreNumbers(day.std);

  return !!dayOk;
}
