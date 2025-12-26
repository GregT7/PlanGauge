export default function resolveUser(userStr) {
  if (!userStr) return "visitor";
  if (userStr === "owner") return "owner";
  if (userStr === "guest") return "guest";
  return "visitor";
}