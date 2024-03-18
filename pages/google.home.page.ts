import {Page, expect, Locator} from '@playwright/test'
import { BasePage } from './base.page';
import { assertVisual } from '../utils/visual';

export enum ButtonOptions {
    RejectAll = 'rechazar todo',
    Accept = 'Aceptar',
    MoreOptions = 'Más opciones',
}

export class HomePage extends BasePage {
    readonly locators = {
        searchArea: 'form textarea',
        titleResult: 'h3',
        paraResults: '#mw-content-text p',
        wikipediaResult: '[data-snc="zQdGcb"] > div:nth-child(1)',
        paragraphFirstAutomatedProcess: '.mw-content-ltr.mw-parser-output > p:nth-of-type(36)'
    };

    constructor(page: Page){
        super(page)
    }

    async searchWord (option: string) {
        await this.page.locator(this.locators.searchArea).fill(option);
    await this.page.getByText(option, { exact: true }).click();
    }

    async validateTheSearchResultInWikipedia (option: string, expectedUrl: string) {
        await expect(this.page.getByRole('link', { name: option })).toContainText(expectedUrl);
    }

    async validateTheSearchResultInWikipediaAutomation () {
        await assertVisual(
            this.page, "search-result",
            { selector: this.locators.wikipediaResult }
        )
    }

    async selectWikipediaResult (option: string) {
        await this.page.locator(this.locators.titleResult, { hasText: option }).click();
    }

    async validateResultInWikipediaPage(option: string, expectedText: string){
        await this.page.locator(this.locators.paraResults, { hasText: option }).scrollIntoViewIfNeeded();
        await expect(this.page.locator(this.locators.paraResults, { hasText: option })).toContainText(expectedText);
    }

    async validateResultFirstAutomatatedProcess (option: string){
        await this.page.locator(this.locators.paraResults, { hasText: option }).scrollIntoViewIfNeeded();
        await assertVisual(
            this.page, "result-paragraph-first-automated-process",
            { selector: this.locators.paragraphFirstAutomatedProcess }
        )
    }
}