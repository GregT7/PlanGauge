import { test, expect } from '@playwright/test';
import demoTasks from "../src/utils/demoTasks.json" with { type: 'json' }
import { 
  populateTable,
  expectToast,
  stubPost
 } from  "@/utils/e2eHelpers"

test('Submit plan → success toast; no duplicate POSTs on double-click', async ({ page }) => {
    test.setTimeout(30_000); // 60s for THIS test

  
  const submitRegex = /\/api\/plan-submissions$/

  // Intercept the backend route your UI calls
  const submitStub = await stubPost(
    page,
    submitRegex,          // 👈 update if your endpoint differs
    { ok: true, id: 'mock-123' },
    200
  );

    try {
        await page.goto('/');
        await expectToast(page, 'Data Successfully Retrieved And Processed!');
        await expectToast(page, 'All Systems Online!');
        await populateTable(demoTasks.slice(0,3), page);
        

        // submit.spec.js (optional tweak)
        const waiter = page.waitForResponse(
            res => submitRegex.test(res.url()) && res.request().method() === 'POST'
        );

        const submitBtn = page.getByRole('button', { name: /submit/i });
        await submitBtn.click();
        await submitBtn.click();

        await waiter; // ensure the (single) POST settled before asserting
        await expectToast(page, 'Data Successfully Saved!');
        expect(submitStub.calls).toBe(1);


        await page.waitForTimeout(2000);
        const p1 = submitBtn.click();
        const p2 = submitBtn.click();
        await Promise.all([p1, p2]);

        await expectToast(page, 'Data Successfully Saved!');
        expect(submitStub.calls).toBe(2);
    } finally {
        // Cleanup to prevent route leak warnings
        await submitStub.cleanup();
        await page.unrouteAll({ behavior: 'ignoreErrors' });
    }


});