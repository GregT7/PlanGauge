// formatDateToYYYYMMDD.js
export default function formatDateToYYYYMMDD(input) {
  if (input == null) return "";                       // null/undefined → ""
  if (typeof input === "string") {
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return input; // already formatted
    const parsed = new Date(input);
    if (!Number.isNaN(parsed.getTime())) input = parsed; // parseable string
    else return "";                                      // bad string
  }
  if (!(input instanceof Date)) return "";               // non-date fallback

  const year = input.getUTCFullYear();
  const month = String(input.getUTCMonth() + 1).padStart(2, "0");
  const day = String(input.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}