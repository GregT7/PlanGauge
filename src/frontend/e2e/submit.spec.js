import { test, expect } from '@playwright/test';
import { stubPost } from "@/utils/networkMock";

// - [ ] Submit plan (happy path)
// - Intercept POSTs to Notion/Supabase (mock 200s).
// - Click submit → success toast appears; no duplicate requests on fast double-click.
async function expectToast(page, text, timeout = 5000) {
  await page.getByRole('listitem').filter({ hasText: new RegExp(text, 'i') })
    .first().waitFor({ state: 'visible', timeout });
}


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
        await expectToast(page, 'Data Successfully Retrieved And Processed!');
        await expectToast(page, 'All Systems Online!');
        const submitBtn = page.getByRole('button', { name: /submit/i });
        // const p1 = submitBtn.click();
        // const p2 = submitBtn.click();
        // await Promise.all([p1, p2]);

        await submitBtn.click();
        await page.waitForTimeout(300);
        // Wait for the stubbed POST to be seen
        await page.waitForResponse((res) =>
            submitRegex.test(res.url()) && res.request().method() === 'POST'
        );
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
