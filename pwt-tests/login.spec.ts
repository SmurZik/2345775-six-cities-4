import { test, expect } from '@playwright/test';

test('check successful login', async ({ page }) => {
    await page.goto('http://localhost:5173/');
  
    // log in
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

    // check redirection if already logged in
    await page.goto('http://localhost:5173/login');
    await page.waitForURL('http://localhost:5173');
  });

  test('check invalid password', async ({ page }) => {
    await page.goto('http://localhost:5173/');
  
    // Expect a title "to contain" a substring
    await expect(page.locator('.header__nav-list')).toBeVisible();
    const status = await page.locator('.header__nav-link').filter({hasText: 'Login'}).allInnerTexts();
    if (status.length === 0) {
        await page.locator('.header__nav-link').filter({hasText: 'Sign out'}).click();
    }
    await page.locator('.header__nav-link').filter({hasText: 'Login'}).click();
    await page.waitForSelector('.page__main--login');
    await expect(page).toHaveURL(/.+\/login/);

    // try to login with invalid password (only letters)
    await page.fill('input[name="email"]', 'example@mail.ru');
    await page.fill('input[name="password"]', 'pass');
    
    await page.locator('.login__submit').click();
    await page.waitForURL('http://localhost:5173/login');
  });
