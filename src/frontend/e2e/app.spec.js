import { test, expect } from '@playwright/test';

test.beforeEach(async ({ request }) => {
  const res = await request.post('http://localhost:5001/api/test/seed?fixture=baseline');
  expect(res.ok()).toBeTruthy();
});


test('app loads home', async ({ page }) => {
  await page.goto('/');                 // uses baseURL + '/'
  // Pick a rock-solid selector in your UI:
  // await expect(page).toHaveTitle(/PlanGauge/i);    // or replace with a stable text below
  // Examples you can swap in:
  // await expect(page.getByText('Task Name')).toBeVisible();
  // await expect(page.getByRole('heading', { name: /Evaluation/i })).toBeVisible();
});
