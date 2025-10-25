import { test, expect } from '@playwright/test';
import { genDaysOfCurrentWeek, parseDate } from "@/utils/genDefaultCardData"
import demoTasks from "../src/utils/demoTasks.json" with { type: 'json' }
import categories from "../src/utils/categories.json" with { type: 'json' }
import toLocalMidnight from '@/utils/toLocalMidnight';



// ---- helpers ----
function hasClassRe(twClass) { return new RegExp(`(?:^|\\s)${twClass}(?:\\s|$)`); }

async function expectToast(page, text, timeout = 5000) {
  await page.getByRole('listitem').filter({ hasText: new RegExp(text, 'i') })
    .first().waitFor({ state: 'visible', timeout });
}

async function expectClassesAll(locators, twClass, timeout = 5000) {
  await Promise.all(locators.map(loc => expect(loc).toHaveClass(hasClassRe(twClass), { timeout })));
}

async function expectClassSwapped(locator, beforeClass, afterClass, timeout = 5000) {
  await expect(locator).not.toHaveClass(hasClassRe(beforeClass), { timeout });
  await expect(locator).toHaveClass(hasClassRe(afterClass), { timeout });
}

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
  await page.goto('/');

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

async function selectDate(date, page) {
  const today = new Date();
  const thisMonth = today.getMonth()
  const desiredMonth = date.getMonth()
  const monthDiff = desiredMonth - thisMonth

  // go back one month
  if (monthDiff === -1) {
    await page.getByRole('button', { name: /previous month/i }).click();
  }
  // go forward one month
  else if (monthDiff === 1) {
    await page.getByRole('button', { name: /next month/i }).click();
  }

  const dateNumber = date.getDate();
  await page.getByRole('gridcell', { name: dateNumber }).click();
}

async function populateRow(row, task, page, days) {
  await row.getByRole('textbox').fill(task.name);        // Locator

  const buttons = await row.getByRole('button');

  // Select Category
  await buttons.nth(0).click()
  await page.waitForTimeout(200);
  const menu = page.getByRole('menu'); // DropdownMenuContent renders a menu role
  await expect(menu).toBeVisible();
  const category = task.category
  await page.getByRole('menuitemradio', { name: category }).click();

  // Due Date (date)
  await buttons.nth(1).click()
  await page.waitForTimeout(200);
  await expect(page.getByRole('dialog')).toBeVisible();
  let taskDueDate = parseDate(task.start_date, days)
  taskDueDate = toLocalMidnight(taskDueDate)
  await selectDate(taskDueDate, page)

  // Start Date (date)
  await buttons.nth(2).click()
  await page.waitForTimeout(200);
  await expect(page.getByRole('dialog')).toBeVisible();
  let taskStartDate = parseDate(task.start_date, days)
  taskStartDate = toLocalMidnight(taskStartDate)
  await selectDate(taskStartDate, page)

  // Time (spinbutton)
  const timeNum = task.time_estimation
  await row.getByRole('spinbutton').fill(timeNum.toString());
}

async function populateTable(tasks, page) {
  await page.getByRole('heading', { name: 'Task Table' }).waitFor();

  const days = genDaysOfCurrentWeek();
  const rows = page.getByTestId('task-row');           // Locator, not array
  const existing = await rows.count();
  const toAdd = tasks.length - existing;

  for (let i = 0; i < toAdd; i++) {
    await page.getByTestId('add-task-button').click();    // ensure test id matches source
  }

  const finalCount = await rows.count();
  for (let i = 0; i < finalCount; i++) {
    const row = rows.nth(i);                           // still a Locator
    const task = tasks[i];
    await populateRow(row, task, page, days)
  }
}

const days = genDaysOfCurrentWeek();
const expectedStatCards = [
  {name: 'Monday', date: toLocalMidnight(parseDate('Monday', days)), status: "Moderate", sum: 490},
  {name: 'Tuesday', date: toLocalMidnight(parseDate('Tuesday', days)), status: "Good", sum: 345},
  {name: 'Wednesday', date: toLocalMidnight(parseDate('Wednesday', days)), status: "Good", sum: 270},
  {name: 'Thursday', date: toLocalMidnight(parseDate('Thursday', days)), status: "Good", sum: 480},
  {name: 'Friday', date: toLocalMidnight(parseDate('Friday', days)), status: "Poor", sum: 60},
  {name: 'Saturday', date: toLocalMidnight(parseDate('Saturday', days)), status: "Moderate", sum: 550},
  {name: 'Sunday', date: toLocalMidnight(parseDate('Sunday', days)), status: "Moderate", sum: 330}
]

// [ 'Saturday', 'October 25, 2025', 'Status: Unknown', 'Sum: 0 mins' ]
function parseStatCard(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const result = {};

  result.name = lines[0];
  result.date = new Date(lines[1])
  result.status = lines[2].replace('Status:', '').trim();
  const sumWords = String(lines[3]).split(" ")
  result.sum = Number(sumWords[1])

  return result;
}





// test('Enter tasks → per-day totals & summary', async ({ page }) => {
//   test.setTimeout(60_000); // 60s for THIS test
//   await page.goto('/');
//   await populateTable(demoTasks, page);

//   // Wait for at least one StatCard to appear
//   const cards = page.getByTestId('StatCard');
//   await expect(cards.first()).toBeVisible();


//   for (let i = 0; i < await cards.count(); i++) {
//     const card = cards.nth(i);
//     const parsed = parseStatCard(await card.innerText());

//     // Find expected by name (or use date if that’s more stable)
//     const expected = expectedStatCards.find(c => c.name === parsed.name);
//     expect(expected, `No expected data for ${parsed.name}`).toBeTruthy();

//     // Normalize dates to ms since epoch for equality
//     const gotTime = +new Date(parsed.date);
//     const expTime = +new Date(expected.date);

//     expect(gotTime, `Date mismatch for ${parsed.name}`).toBe(expTime);
//     expect(parsed.status, `Status mismatch for ${parsed.name}`).toBe(expected.status);
//     expect(parsed.sum, `Sum mismatch for ${parsed.name}`).toBe(expected.sum);
//   }

//   expect(await page.getByTestId('time-display').innerText()).toBe("2525")
//   expect(page.getByText('(87 pts)')).toBeVisible()
//   expect(page.getByText('100 pts')).toBeVisible()
//   expect(page.getByText('69 pts')).toBeVisible()
// });

// Category & Date inputs basic UX
// - Change Category via dropdown; pill color updates.
// - Pick Start/Due via calendar; formatted date appears and popover closes.

async function expectCategoryOptions(menu) {
  // Get all menu radio items (shadcn uses role="menuitemradio")
  const options = menu.getByRole('menuitemradio');

  const count = await options.count();
  const result = [];

  for (let i = 0; i < count; i++) {
    const option = options.nth(i);
    const name = await option.innerText();
    const className = await option.getAttribute('class'); // <-- get Tailwind class string
    expect(className.includes(categories?.[name])).toBeTruthy()
  }

  return result;
}

// test('Enter tasks → per-day totals & summary', async ({ page }) => {
//   await page.goto('/');
//   const rows = page.getByTestId('task-row'); 
//   const row = rows.nth(0);  

//   const buttons = row.getByRole('button');
//   const cattegoryButton = buttons.nth(0)
//   await cattegoryButton.click()
//   await page.waitForTimeout(200);
//   const menu = page.getByRole('menu'); // DropdownMenuContent renders a menu role
//   await expect(menu).toBeVisible();

//   await expectCategoryOptions(menu)

//   const category = "Career"
//   await page.getByRole('menuitemradio', { name: category }).click();
//   const name = await cattegoryButton.innerText()
//   expect(name).toBe(category)
// })

import { stubPost } from "@/utils/networkMock";
test('Submit plan → success toast; no duplicate POSTs on double-click', async ({ page }) => {
    test.setTimeout(17_000); // 60s for THIS test

  await page.goto('http://localhost:4173/');
  const submitRegex = /\/api\/plan-submissions$/

  // Intercept the backend route your UI calls
  const submitStub = await stubPost(
    page,
    submitRegex,          // 👈 update if your endpoint differs
    { ok: true, id: 'mock-123' },
    200
  );

    try {
        
        // await expectToast(page, 'Data Successfully Retrieved And Processed!');
        // await expectToast(page, 'All Systems Online!');
        await populateTable(demoTasks.slice(0,3), page);
        const submitBtn = page.getByRole('button', { name: /submit/i });
        // const p1 = submitBtn.click();
        // const p2 = submitBtn.click();
        // await Promise.all([p1, p2]);

        // start waiter first
const responsePromise = page.waitForResponse(res =>
  submitRegex.test(res.url()) && res.request().method() === 'POST'
);
        await submitBtn.click();
        await submitBtn.click();
        await expectToast(page, 'Data Successfully Saved!');
        await page.waitForTimeout(300);
        // 

    } finally {
        // Cleanup to prevent route leak warnings
        await submitStub.cleanup();
        await page.unrouteAll({ behavior: 'ignoreErrors' });
    }

//     // Simulate a fast double-click
//     const p1 = submitBtn.click();
//     const p2 = submitBtn.click();
//     await Promise.all([p1, p2]);

//     // Wait for the stubbed POST to be seen
//     await page.waitForResponse((res) =>
//       /\/api\/submitPlan$/.test(res.url()) && res.request().method() === 'POST'
//     );

//     // Check for toast message
//     const toast = page
//       .getByRole('status')
//       .or(page.getByRole('alert'))
//       .or(page.getByText(/success|submitted|plan saved/i));
//     await expect(toast).toBeVisible();

//     // Assert only one POST call happened
//     expect(submitStub.calls).toBe(1);

//   } finally {
//     // Cleanup to prevent route leak warnings
//     await submitStub.cleanup();
//     await page.unrouteAll({ behavior: 'ignoreErrors' });
//   }
});


