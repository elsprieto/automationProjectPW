import { expect, Page } from "@playwright/test";

export abstract class BasePage {
    readonly page: Page;
    readonly path: string; 
    readonly baseURL: string;


    constructor(page: Page){
        this.page = page;
        this.baseURL = this.baseURL; 
    }

    async navigateTo(){
        console.log(this.baseURL)
        await this.page.goto(this.baseURL);
    }
}