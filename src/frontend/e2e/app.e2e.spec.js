import { test, expect } from '@playwright/test';
import demoTasks from "../src/utils/demoTasks.json" with { type: 'json' }
import { 
  populateTable,
  expectToast,
  expectClassesAll,
  expectClassSwapped,
  parseStatCard,
  expectedStatCards,
  expectCategoryOptions
 } from  "@/utils/e2eHelpers"

test.beforeEach(async ({ page }) => {
  await page.route('**/api/db/stats', async route => {
    await page.waitForTimeout(600); await route.continue();
  });
  await page.route('**/api/**/health', async route => {
    await page.waitForTimeout(600); await route.continue();
  });
  await page.addStyleTag({ content: `*,*:before,*:after { transition: none !important; animation: none !important; }`});
});

test.afterEach(async ({ page }) => {
  // ignore any in-flight handlers when the test ends
  await page.unrouteAll({ behavior: 'ignoreErrors' });
});

test('app loads home (stable)', async ({ page }) => {
  await page.goto(process.env.VITE_REACT_ROUTE || 'http://localhost:5173/');

  const taskHeading = page.getByRole('heading', { name: 'Task Table' });
  const taskContainer = taskHeading.locator('..');
  const statContainer = page.getByRole('heading', { name: 'Stat Card System' }).locator('..');
  const evalContainer = page.getByRole('heading', { name: 'Evaluation Section' }).locator('..');
  const buttonContainer = page.getByRole('button', { name: 'Submit' });
  const containers = [taskContainer, statContainer, evalContainer, buttonContainer];

  // Initial state: red borders + loading toasts appear
  await expectClassesAll(containers, 'border-red-600');
  await expectToast(page, 'Retrieving statistical data...');
  await expectToast(page, 'Testing system connections...');

  // Wait for requests to complete
  await page.waitForResponse(r => r.url().includes('/api/db/stats') && r.status() === 200);
  await expectToast(page, 'Data Successfully Retrieved And Processed!');

  await page.waitForResponse(r => r.url().includes('/api/db/health') && r.status() === 200);
  await page.waitForResponse(r => r.url().includes('/api/notion/health') && r.status() === 200);
  await expectToast(page, 'All Systems Online!');

  // Borders transition to neutral; ensure swap per-element to avoid race
  await Promise.all(containers.map(c => expectClassSwapped(c, 'border-red-600', 'border-zinc-500')));
});

test('Enter tasks → per-day totals & summary', async ({ page }) => {
  test.setTimeout(60_000); // 60s for THIS test
  await page.goto(process.env.VITE_REACT_ROUTE || 'http://localhost:5173/');
  await populateTable(demoTasks, page);

  // Wait for at least one StatCard to appear
  const cards = page.getByTestId('StatCard');
  await expect(cards.first()).toBeVisible();


  for (let i = 0; i < await cards.count(); i++) {
    const card = cards.nth(i);
    const parsed = parseStatCard(await card.innerText());

    // Find expected by name (or use date if that’s more stable)
    const expected = expectedStatCards.find(c => c.name === parsed.name);
    expect(expected, `No expected data for ${parsed.name}`).toBeTruthy();

    // Normalize dates to ms since epoch for equality
    const gotTime = +new Date(parsed.date);
    const expTime = +new Date(expected.date);

    expect(gotTime, `Date mismatch for ${parsed.name}`).toBe(expTime);
    expect(parsed.status, `Status mismatch for ${parsed.name}`).toBe(expected.status);
    expect(parsed.sum, `Sum mismatch for ${parsed.name}`).toBe(expected.sum);
  }

  expect(await page.getByTestId('time-display').innerText()).toBe("2525")
  expect(page.getByText('(87 pts)')).toBeVisible()
  expect(page.getByText('100 pts')).toBeVisible()
  expect(page.getByText('69 pts')).toBeVisible()
});


// Category & Date inputs basic UX
// - Change Category via dropdown; pill color updates.
// - Pick Start/Due via calendar; formatted date appears and popover closes.
test('Category & Date inputs basic UX', async ({ page }) => {
  await page.goto(process.env.VITE_REACT_ROUTE || 'http://localhost:5173/');
  const rows = page.getByTestId('task-row'); 
  const row = rows.nth(0);  

  const buttons = row.getByRole('button');
  const cattegoryButton = buttons.nth(0)
  await cattegoryButton.click()
  await page.waitForTimeout(200);
  const menu = page.getByRole('menu'); // DropdownMenuContent renders a menu role
  await expect(menu).toBeVisible();

  await expectCategoryOptions(menu)

  const category = "Career"
  await page.getByRole('menuitemradio', { name: category }).click();
  const name = await cattegoryButton.innerText()
  expect(name).toBe(category)
})

// - Stats failure → user feedback
// - Mock /stats failure (timeout/500).
// - Error toast/state shows; retry (or reload) recovers with success fixture.
test('shows error when /stats fails', async ({ page }) => {
  // Mock /stats to return 500
  await page.route('**/api/db/stats**', route => {
      route.fulfill({ status: 500, body: 'Server Error' });
  });

  await page.goto(process.env.VITE_REACT_ROUTE || 'http://localhost:5173/');
  await expect(page.getByText("Error: Stats Retrieval Failure!")).toBeVisible();
});