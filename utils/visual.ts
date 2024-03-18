import { Page, expect, ElementHandle, Locator } from '@playwright/test';

interface VisualCheckPareters {
    selector?: string;
    locator?: Locator;
    includeScrollableContent?: boolean;
}

interface VisualOptions {
    comparator: string,
    fullPage: boolean,
    maxDiffPixelRatio: number;
    mask: Locator[],
    threshold: number,
}

function artifact(name: string, screenshotContext?: string){
    if (screenshotContext) return `${name}-${screenshotContext}.png`;
    return `${name}.png`;
}



export async function assertVisual(
    page: Page,
    name: string,
    checkInfo?: VisualCheckPareters,
    excludeLocators?: Locator[]
){

let visualOptions = {} as VisualOptions;
visualOptions.threshold = 0.2;
visualOptions.maxDiffPixelRatio = 0.01;
visualOptions.fullPage = !checkInfo?.selector;

if(excludeLocators !== undefined) visualOptions.mask = excludeLocators;

if(
    !checkInfo?.selector ||
    checkInfo === undefined ||
    Object.keys(visualOptions).length === 0
) {
    await expect(page).toHaveScreenshot(artifact(name), visualOptions);
} else {
    const el: any = 
        checkInfo.locator !== undefined
        ? await checkInfo.locator.elementHandle()
        : await page.waitForSelector(checkInfo?.selector);
    if (!checkInfo?.includeScrollableContent) {
        await expect(page.locator(checkInfo?.selector)).toHaveScreenshot(
            artifact(name),
            visualOptions
        );
        }
    }
}
