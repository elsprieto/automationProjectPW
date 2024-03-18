import {Page, expect, Locator} from '@playwright/test'
import { BasePage } from './base.page';

export enum ButtonOptions {
    RejectAll = 'rechazar todo',
    Accept = 'Aceptar',
    MoreOptions = 'Más opciones',
}

export class CookiesPage extends BasePage {
    readonly locators = {

    };
    
    readonly uiElements = {

    };

    constructor(page: Page) {
        super(page);
    }

    async selectOpionfromCookiesPage(option: string){
        await this.page.getByRole('button', {name: option}).click();
    }

}