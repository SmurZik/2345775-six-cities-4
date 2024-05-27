import { test, expect } from '@playwright/test';

test('check city filtering', async ({ page }) => {
    await page.goto('http://localhost:5173/');
  
    await expect(page.locator('.locations__item-link')).toHaveCount(6);
    await expect(page.locator('.cities__card')).toHaveCount(20);

    const firstParisOfferInfo = await page.locator('.place-card__info').first().textContent();
    await expect(page.locator('.locations__item-link').filter({hasText: 'Paris'})).toHaveClass(/.*tabs__item--active.*/);
    
    await page.locator('.locations__item-link').getByText('Dusseldorf').click();
    await expect(page.locator('.locations__item-link').filter({hasText: 'Dusseldorf'})).toHaveClass(/.*tabs__item--active.*/);
    await expect(page.locator('.locations__item-link').filter({hasText: 'Paris'})).toHaveClass(/.*tabs__item--inactive.*/);

    const firstDusseldorfOfferInfo = await page.locator('.place-card__info').first().textContent();
    expect(firstDusseldorfOfferInfo).not.toBe(firstParisOfferInfo);

    await page.locator('.locations__item-link').getByText('Paris').click();
    await expect(page.locator('.locations__item-link').filter({hasText: 'Dusseldorf'})).toHaveClass(/.*tabs__item--inactive.*/);
    await expect(page.locator('.locations__item-link').filter({hasText: 'Paris'})).toHaveClass(/.*tabs__item--active.*/);
    expect(await page.locator('.place-card__info').first().textContent()).toBe(firstParisOfferInfo);

  });