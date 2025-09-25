// verifyPayload.test.js
import { describe, it, expect } from 'vitest';
import { verify_task, verify_payload } from '@/utils/verifyPayload.js';

const validTask = () => ({
  name: 'Read paper',
  category: 'School',
  due_date: '2025-09-30',
  start_date: '2025-09-24',
  time_estimation: 60,
});

describe('verify_task', () => {
  it('returns true for a fully valid task', () => {
    expect(verify_task(validTask())).toBe(true);
  });

  it('allows extra properties beyond the expected keys', () => {
    const t = { ...validTask(), notes: 'optional' };
    expect(verify_task(t)).toBe(true);
  });

  it('returns false for non-objects or null', () => {
    expect(verify_task(null)).toBe(false);
    expect(verify_task(undefined)).toBe(false);
    // @ts-expect-error
    expect(verify_task('not-an-object')).toBe(false);
    // @ts-expect-error
    expect(verify_task(123)).toBe(false);
  });

  it('returns false if a required key is missing', () => {
    const { name, ...rest } = validTask();
    expect(verify_task(rest)).toBe(false);
  });

  it('returns false if a type is incorrect', () => {
    const wrong = { ...validTask(), time_estimation: '60' }; // should be number
    expect(verify_task(wrong)).toBe(false);
  });

  it('does not validate date format here (only type); date as string passes', () => {
    const weirdDates = {
      ...validTask(),
      due_date: '09/30/2025',
      start_date: '09-24-2025',
    };
    // verify_task only checks "string" type, not format, so this is true
    expect(verify_task(weirdDates)).toBe(true);
  });
});

describe('verify_payload', () => {
  const basePayload = () => ({
    tasks: [validTask()],
    filter_start_date: '2025-09-01',
    filter_end_date: '2025-09-30',
  });

  it('returns true for a valid payload with at least one valid task', () => {
    expect(verify_payload(basePayload())).toBe(true);
  });

  it('returns false when payload is not an object', () => {
    // @ts-expect-error
    expect(verify_payload(null)).toBe(false);
    // @ts-expect-error
    expect(verify_payload('nope')).toBe(false);
    // Arrays are objects in JS but will fail due to missing keys
    // @ts-expect-error
    expect(verify_payload([])).toBe(false);
  });

  it('returns false when required top-level keys are missing', () => {
    const { tasks, ...rest } = basePayload();
    const missingTasks = rest;
    expect(verify_payload(missingTasks)).toBe(false);

    const noDates = { tasks: [validTask()] };
    expect(verify_payload(noDates)).toBe(false);
  });

  it('returns false when filter dates are not in YYYY-MM-DD format', () => {
    const p1 = { ...basePayload(), filter_start_date: '2025/09/01' };
    expect(verify_payload(p1)).toBe(false);

    const p2 = { ...basePayload(), filter_end_date: '2025-9-30' };
    expect(verify_payload(p2)).toBe(false);

    const p3 = { ...basePayload(), filter_end_date: ' 2025-09-30 ' };
    expect(verify_payload(p3)).toBe(false);
  });

  it('returns false when tasks is not an array', () => {
    const p = { ...basePayload(), tasks: 'not-an-array' };
    // @ts-expect-error
    expect(verify_payload(p)).toBe(false);
  });

  it('returns false when tasks array is empty', () => {
    const p = { ...basePayload(), tasks: [] };
    expect(verify_payload(p)).toBe(false);
  });

  it('returns false when there are no valid tasks in the array', () => {
    const invalidTask = { ...validTask(), time_estimation: '60' }; // wrong type
    const p = { ...basePayload(), tasks: [invalidTask] };
    expect(verify_payload(p)).toBe(false);
  });

  it('returns true if at least one task is valid, even if others are invalid', () => {
    const bad1 = { ...validTask(), time_estimation: '60' };
    const bad2 = { name: 'x' }; // missing most keys
    const p = { ...basePayload(), tasks: [bad1, validTask(), bad2] };
    expect(verify_payload(p)).toBe(true);
  });
});
