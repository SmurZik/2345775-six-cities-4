import { test, expect } from '@playwright/test';

test('check successful comment posting', async ({ page }) => {
    await page.goto('http://localhost:5173/');
  
    await expect(page.locator('.header__nav-list')).toBeVisible();
    const status = await page.locator('.header__nav-link').filter({hasText: 'Login'}).allInnerTexts();
    if (status.length === 0) {
        await page.locator('.header__nav-link').filter({hasText: 'Sign out'}).click();
    }
    await page.locator('.header__nav-link').filter({hasText: 'Login'}).click();
    await page.waitForSelector('.page__main--login');
    await expect(page).toHaveURL(/.+\/login/);

    await page.fill('input[name="email"]', 'example@mail.ru');
    await page.fill('input[name="password"]', 'pass123');
    
    await page.locator('.login__submit').click();
    await page.waitForURL('http://localhost:5173');

    await expect(page.locator('.cities__card')).toHaveCount(20);
    await page.locator('.place-card__name').first().click();

    const review = 'amazing amazing amazing amazing amazing amazing amazing';

    await expect(page.locator('.reviews__form')).toBeVisible();
    await page.locator('.reviews__textarea').fill(review);
    await page.getByTitle('perfect').click();
    await page.locator('.reviews__submit').click();
    await page.waitForResponse((response) => response.url().includes('/comments'));

    expect(await page.locator('.reviews__text').first().textContent()).toBe(review);
    expect(await page.locator('.reviews__user-name').first().textContent()).toBe(' example ');
    expect(await page.locator('.reviews__stars>span').first().getAttribute('style')).toBe('width: 100%;');

  });

  test('check comment posting by guest', async ({ page }) => {
    await page.goto('http://localhost:5173/');
  
    // Expect a title "to contain" a substring.
    await expect(page.locator('.header__nav-list')).toBeVisible();
    const status = await page.locator('.header__nav-link').filter({hasText: 'Login'}).allInnerTexts();
    if (status.length === 0) {
        await page.locator('.header__nav-link').filter({hasText: 'Sign out'}).click();
    }

    await expect(page.locator('.cities__card')).toHaveCount(20);
    await page.locator('.place-card__name').first().click();

    await expect(page.locator('.reviews__form')).not.toBeVisible();

  });