// ✅ ESM version — mock POST requests with a counter
import { expect } from '@playwright/test';

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
