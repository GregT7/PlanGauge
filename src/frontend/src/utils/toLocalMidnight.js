export default function toLocalMidnight(date) {
  if (typeof date === "string") {
    // manually parse as local date instead of letting Date guess UTC
    const [year, month, day] = date.split("-").map(Number);
    return new Date(year, month - 1, day); // Local midnight
  } else if (date instanceof Date) {
    // Assume already a local date (from picker or programmatic input)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  return null; // or throw an error
}
