import { test, expect } from '@playwright/test';
import { ButtonOptions } from '../pages/cookies.page';
import { CookiesPage } from '../pages/cookies.page';
import { HomePage } from '../pages/google.home.page';

test.beforeEach(async ({ page }) => {
  let cookiesPage = new CookiesPage(page);
  await page.goto('');
  await cookiesPage.selectOpionfromCookiesPage('Rechazar todo');
  await expect(page).toHaveTitle(/Google/);
});

test.describe('Validate the Search option', () => {
  test.describe('Accepting the cookies option', () => {
    test('validate searching result about automation in wikipedia page with page Object Model [ @regression , @functional , @home ]', async ({ page }) => {
      // Expect a title "to contain" a substring.
      let homePage = new HomePage(page)
      await homePage.searchWord('automatizacion');
      await homePage.validateTheSearchResultInWikipedia('Automatización - Wikipedia,','https://es.wikipedia.org › wiki › Automatización');
      await homePage.selectWikipediaResult('Automatización - Wikipedia');
      await homePage.validateResultInWikipediaPage('Oliver Evans' ,'en 1785, convirtiéndose en el primer proceso industrial completamente automatizado.');
    });

    test('validate searching result about automation in wikipedia page with assert visual [ @regression , @visual , @home ]', async ({ page }) => {
      // Expect a title "to contain" a substring.
      let homePage = new HomePage(page)
      await homePage.searchWord('automatizacion');
      await homePage.validateTheSearchResultInWikipediaAutomation();
      await homePage.selectWikipediaResult('Automatización - Wikipedia');
      await homePage.validateResultFirstAutomatatedProcess('Oliver Evans');
    });
  });
});

