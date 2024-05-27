import { test, expect } from '@playwright/test';

test('check offers loading', async ({ page }) => {
    await page.goto('http://localhost:5173/');
    
    await expect(page.locator('.locations__item-link')).toHaveCount(6);
    await expect(page.locator('.places__found')).toHaveText('20 places to stay in Paris');
    await expect(page.locator('.cities__card')).toHaveCount(20);
    await expect(page.locator('.place-card__image')).toHaveCount(20);
    await expect(page.locator('.place-card__image').last()).toHaveAttribute('src', /https:\/\/.+\.jpg/);
    await expect(page.locator('.place-card__price-text').last()).toBeVisible();
  });