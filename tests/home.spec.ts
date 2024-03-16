import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('button', {name: 'Rechazar todo'}).click();
  await expect(page).toHaveTitle(/Google/);
});

test.describe('Validate the Search option', () => {
  test('validate searching result about automation in wikipedia page [ @functional , @smoke ]', async ({ page }) => {
      // Expect a title "to contain" a substring.
      await page.locator('form textarea').fill('automatizacion');
      await page.getByText('automatizacion', { exact: true }).click();
      await expect(page.getByRole('link', { name: 'Automatización - Wikipedia,' })).toContainText('https://es.wikipedia.org › wiki › Automatización');
      await page.locator('h3', {hasText: 'Automatización - Wikipedia'}).click();
      await page.locator('#mw-content-text p', { hasText: 'Oliver Evans'}).scrollIntoViewIfNeeded();
      await expect(page.locator('#mw-content-text p', { hasText: 'Oliver Evans'})).toContainText('en 1785, convirtiéndose en el primer proceso industrial completamente automatizado.');

  });
  
  test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
  
    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();
  
    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
});

