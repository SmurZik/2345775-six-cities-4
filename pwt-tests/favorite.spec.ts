import { test, expect } from '@playwright/test';

test('favorite action from main-screen', async ({ page }) => {
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

    await page.locator('.header__nav-link--profile').click();
    await page.waitForSelector('.page__main--favorites');

    let initialFavoritesNumber = Number(await page.locator('.header__favorite-count').textContent());
    await expect(page.locator('.favorites__card')).toHaveCount(initialFavoritesNumber);
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('.cities__card');
    // click bookmark-button from main-screen
    const temp = await page.locator('.cities__card').first().filter({has: page.locator('.place-card__bookmark-button--active')}).count();
    const isFavorite = temp === 0 ? false : true;
    await page.locator('.place-card__bookmark-button').first().click();
    if (isFavorite) {
        initialFavoritesNumber--
    } else {
        initialFavoritesNumber++
    }
    await page.waitForResponse((response) => response.url().includes('/favorite'));
    expect(Number(await page.locator('.header__favorite-count').textContent())).toBe(initialFavoritesNumber);
    await page.goto('http://localhost:5173/favorites');
    if (initialFavoritesNumber === 0) {
        await page.waitForSelector('.page__main--favorites-empty');
    } else {
        await page.waitForSelector('.place-card');
        await expect(page.locator('.place-card')).toHaveCount(initialFavoritesNumber);
    }
  });

  test('favorite action from offer-screen', async ({ page }) => {
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

    await page.locator('.header__nav-link--profile').click();
    await page.waitForSelector('.page__main--favorites');

    let initialFavoritesNumber = Number(await page.locator('.header__favorite-count').textContent());
    await expect(page.locator('.favorites__card')).toHaveCount(initialFavoritesNumber);
    await page.goto('http://localhost:5173/');
    await page.waitForSelector('.cities__card');
    await page.locator('.place-card__name').first().click();
    await page.waitForSelector('.offer');
    // click bookmark-button from offer-screen
    const temp = await page.locator('.offer__container').filter({has: page.locator('.offer__bookmark-button--active')}).count();
    const isFavorite = temp === 0 ? false : true;
    await page.locator('.offer__bookmark-button').click();
    if (isFavorite) {
        initialFavoritesNumber--
    } else {
        initialFavoritesNumber++
    }
    await page.waitForResponse((response) => response.url().includes('/favorite'));
    expect(Number(await page.locator('.header__favorite-count').textContent())).toBe(initialFavoritesNumber);
    await page.goto('http://localhost:5173/favorites');
    if (initialFavoritesNumber === 0) {
        await page.waitForSelector('.page__main--favorites-empty');
    } else {
        await page.waitForSelector('.place-card');
        await expect(page.locator('.place-card')).toHaveCount(initialFavoritesNumber);
    }
  });

  test('favorite action from favorite-screen', async ({ page }) => {
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

    await page.locator('.header__nav-link--profile').click();
    await page.waitForSelector('.page__main--favorites');

    // click bookmark-button from favorite-screen
    let initialFavoritesNumber = Number(await page.locator('.header__favorite-count').textContent());
    console.log(initialFavoritesNumber);
    if (initialFavoritesNumber > 0) {
        await expect(page.locator('.favorites__card')).toHaveCount(initialFavoritesNumber);
        await page.locator('.place-card__bookmark-button--active').click();
        await page.waitForResponse((response) => response.url().includes('/favorite'));
        expect(Number(await page.locator('.header__favorite-count').textContent())).toBe(initialFavoritesNumber-1);
    }
  });

  test('favorite action by guest', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await expect(page.locator('.header__nav-list')).toBeVisible();
    const status = await page.locator('.header__nav-link').filter({hasText: 'Login'}).allInnerTexts();
    if (status.length === 0) {
        await page.locator('.header__nav-link').filter({hasText: 'Sign out'}).click();
    }
    await page.goto('http://localhost:5173/favorites');
    await expect(page).toHaveURL('http://localhost:5173/login');
  });
  