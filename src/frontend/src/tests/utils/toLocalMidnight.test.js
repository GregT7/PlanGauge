// toLocalMidnight.test.js
import { describe, it, expect } from 'vitest';
import toLocalMidnight from '@/utils/toLocalMidnight';

const ymd = (d) => ({
  y: d.getFullYear(),
  m: d.getMonth() + 1,
  d: d.getDate(),
  hh: d.getHours(),
  mm: d.getMinutes(),
  ss: d.getSeconds(),
  ms: d.getMilliseconds(),
});

describe('toLocalMidnight', () => {
  it('parses "YYYY-MM-DD" strings as local midnight of that calendar day', () => {
    const out = toLocalMidnight('2025-09-24');
    expect(out).toBeInstanceOf(Date);
    const parts = ymd(out);
    expect(parts).toMatchObject({ y: 2025, m: 9, d: 24 });
    expect(parts.hh).toBe(0);
    expect(parts.mm).toBe(0);
    expect(parts.ss).toBe(0);
    expect(parts.ms).toBe(0);
  });

  it('truncates a Date (any time) down to local midnight of the same local day', () => {
    // 3:45 PM local time on 2025-09-24
    const original = new Date(2025, 8, 24, 15, 45, 12, 345);
    const out = toLocalMidnight(original);

    expect(out).toBeInstanceOf(Date);
    const parts = ymd(out);
    expect(parts).toMatchObject({ y: 2025, m: 9, d: 24, hh: 0, mm: 0, ss: 0, ms: 0 });

    // does not mutate original
    const origParts = ymd(original);
    expect(origParts.hh).toBe(15);
  });

  it('prevents off-by-one when starting from a date-only string compared to an ISO Z string', () => {
    // NOTE: In America/New_York, midnight UTC on 2025-09-24 is 8pm (20:00) on 2025-09-23 local.
    // The util is meant to be used with "YYYY-MM-DD" to avoid this shift.
    const fromPlain = toLocalMidnight('2025-09-24');
    const fromISOZInstant = toLocalMidnight(new Date('2025-09-24T00:00:00Z'));

    // Expect the plain string to map to local 2025-09-24 00:00:00
    const p = ymd(fromPlain);
    expect(p).toMatchObject({ y: 2025, m: 9, d: 24, hh: 0 });

    // And the ISO Z instant to truncate to the *local* day of that instant (likely 2025-09-23 in ET)
    const z = ymd(fromISOZInstant);

    // This assertion is timezone-dependent; in ET it should be the 23rd.
    // If you run tests in a different TZ, adjust expectations accordingly.
    expect([23, 24]).toContain(z.d);
    expect(z.hh).toBe(0);
  });

  it('returns null for null/undefined/unsupported types', () => {
    expect(toLocalMidnight(null)).toBeNull();
    expect(toLocalMidnight(undefined)).toBeNull();
    // number, boolean, object, etc.
    // @ts-expect-error – intentionally wrong type
    expect(toLocalMidnight(1700000000000)).toBeNull();
    // @ts-expect-error – intentionally wrong type
    expect(toLocalMidnight(true)).toBeNull();
    // @ts-expect-error – intentionally wrong type
    expect(toLocalMidnight({ y: 2025, m: 9, d: 24 })).toBeNull();
  });

  it('returns an Invalid Date if given a non "YYYY-MM-DD" string (documented behavior)', () => {
    const out = toLocalMidnight('2025-09-24T00:00:00Z');
    expect(out).toBeInstanceOf(Date);
    expect(Number.isNaN(out.getTime())).toBe(true); // Invalid Date
  });
});
