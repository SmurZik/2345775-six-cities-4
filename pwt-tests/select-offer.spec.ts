import { test, expect } from '@playwright/test';

test('check city filtering', async ({ page }) => {
    await page.goto('http://localhost:5173/');
  
    // Expect a title "to contain" a substring.
    await expect(page.locator('.locations__item-link')).toHaveCount(6);
    await expect(page.locator('.cities__card')).toHaveCount(20);
    const firstOfferPrice = await page.locator('.place-card__price-value').first().allInnerTexts();
    const firstOfferTitle = await page.locator('.place-card__name').first().allTextContents();
    const firstOfferType = await page.locator('.place-card__type').first().allTextContents();
    
    await page.locator('.place-card__name').first().click();
    await page.waitForSelector('.offer');
    expect((await page.locator('.offer__name').allInnerTexts())).toStrictEqual(firstOfferTitle);
    expect((await page.locator('.offer__price-value').allInnerTexts())).toStrictEqual(firstOfferPrice);
    expect((await page.locator('.offer__feature--entire').allInnerTexts())).toStrictEqual(firstOfferType);
  });