import toLocalMidnight from "./toLocalMidnight";

export default function isSameDay(d1, d2) {
  const day1 = toLocalMidnight(d1);
  const day2 = toLocalMidnight(d2);
  return day1.getTime() === day2.getTime();
}