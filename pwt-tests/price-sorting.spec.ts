import { test, expect } from '@playwright/test';

test('check city filtering', async ({ page }) => {
    await page.goto('http://localhost:5173/');
  
    await expect(page.locator('.locations__item-link')).toHaveCount(6);
    await expect(page.locator('.cities__card')).toHaveCount(20);
    await expect(page.locator('.places__sorting')).toBeVisible();
    await expect(page.locator('.places__options--custom')).not.toHaveClass(/places__options--opened/);
    await expect(page.locator('.places__option').filter({hasText: 'Popular'})).toHaveClass(/places__option--active/);
    const initialCardSort = await page.locator('.place-card__price-value').allTextContents();
    const lowToHighSort = initialCardSort.slice().sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)));
    const highToLowSort = initialCardSort.slice().sort((a, b) => Number(b.slice(1)) - Number(a.slice(1)));

    await page.locator('.places__sorting-type').click();
    await expect(page.locator('.places__options--custom')).toHaveClass(/places__options--opened/);
    await page.locator('.places__option').filter({hasText: 'Price: low to high'}).click();
    await expect(page.locator('.places__options--custom')).not.toHaveClass(/places__options--opened/);
    await expect(page.locator('.places__option').filter({hasText: 'Price: low to high'})).toHaveClass(/places__option--active/);
    expect(await page.locator('.place-card__price-value').allTextContents()).toStrictEqual(lowToHighSort);

    await page.locator('.places__sorting-type').click();
    await expect(page.locator('.places__options--custom')).toHaveClass(/places__options--opened/);
    await page.locator('.places__option').filter({hasText: 'Price: high to low'}).click();
    await expect(page.locator('.places__options--custom')).not.toHaveClass(/places__options--opened/);
    await expect(page.locator('.places__option').filter({hasText: 'Price: high to low'})).toHaveClass(/places__option--active/);
    expect(await page.locator('.place-card__price-value').allTextContents()).toStrictEqual(highToLowSort);

  });