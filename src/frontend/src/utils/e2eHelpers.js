import { genDaysOfCurrentWeek, parseDate } from "@/utils/genDefaultCardData"
import categories from "@/utils/categories.json" with { type: 'json' }
import toLocalMidnight from '@/utils/toLocalMidnight';
import { expect } from '@playwright/test';

export function hasClassRe(twClass) { return new RegExp(`(?:^|\\s)${twClass}(?:\\s|$)`); }

export async function expectToast(page, text, timeout = 5000) {
  await page.getByRole('listitem').filter({ hasText: new RegExp(text, 'i') })
    .first().waitFor({ state: 'visible', timeout });
}

export async function expectClassesAll(locators, twClass, timeout = 5000) {
  await Promise.all(locators.map(loc => expect(loc).toHaveClass(hasClassRe(twClass), { timeout })));
}

export async function expectClassSwapped(locator, beforeClass, afterClass, timeout = 5000) {
  await expect(locator).not.toHaveClass(hasClassRe(beforeClass), { timeout });
  await expect(locator).toHaveClass(hasClassRe(afterClass), { timeout });
}

export async function selectDate(date, page) {
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

export async function populateTable(tasks, page) {
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

export const days = genDaysOfCurrentWeek();
export const expectedStatCards = [
  {name: 'Monday', date: toLocalMidnight(parseDate('Monday', days)), status: "Moderate", sum: 490},
  {name: 'Tuesday', date: toLocalMidnight(parseDate('Tuesday', days)), status: "Good", sum: 345},
  {name: 'Wednesday', date: toLocalMidnight(parseDate('Wednesday', days)), status: "Good", sum: 270},
  {name: 'Thursday', date: toLocalMidnight(parseDate('Thursday', days)), status: "Good", sum: 480},
  {name: 'Friday', date: toLocalMidnight(parseDate('Friday', days)), status: "Poor", sum: 60},
  {name: 'Saturday', date: toLocalMidnight(parseDate('Saturday', days)), status: "Moderate", sum: 550},
  {name: 'Sunday', date: toLocalMidnight(parseDate('Sunday', days)), status: "Moderate", sum: 330}
]

// [ 'Saturday', 'October 25, 2025', 'Status: Unknown', 'Sum: 0 mins' ]
export function parseStatCard(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const result = {};

  result.name = lines[0];
  result.date = new Date(lines[1])
  result.status = lines[2].replace('Status:', '').trim();
  const sumWords = String(lines[3]).split(" ")
  result.sum = Number(sumWords[1])

  return result;
}

export async function expectCategoryOptions(menu) {
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

export async function stubPost(page, url, body = { ok: true }, status = 200) {
  let count = 0;

  await page.route(url, async (route) => {
    const req = route.request();
    if (req.method() === 'POST') {
      count += 1;
      await route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify(body),
      });
    } else {
      await route.fallback();
    }
  });

  return {
    get calls() {
      return count;
    },
    async cleanup() {
      try {
        await page.unroute(url);
      } catch (_) {}
    },
  };
}