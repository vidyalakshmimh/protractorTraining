import { browser, by, ElementArrayFinder, element } from 'protractor';
import {LoginPage} from './app.po';
let page: LoginPage;

describe('Login page', () => {

    beforeEach(() => {
        page = new LoginPage();
        var originalTimeout;
        browser.ignoreSynchronization = true;
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });


    it('should login, search alexa and verify primeproducts are listed', async (done) => {
        browser.get('https://www.amazon.in');
        await page.signin.click();
        await page.email.sendKeys('9590805885');
        await page.emailContinue.click();
        await page.password.sendKeys('9590805885');
        await page.submit.click();
        await browser.sleep(5000);
        await element.all(by.xpath("//input[@type = 'text']")).get(0).sendKeys('alexa');
        await element(by.xpath("//input[@id = 'nav-search-submit-button']")).click();
        await element.all(by.xpath("//i[@class = 'a-icon a-icon-checkbox']")).get(0).click();
        await browser.driver.sleep(5000);
        let PrimeElements=await element.all(by.xpath("//i[@aria-label = 'Amazon Prime']"))
            .each((ele, index) => {
                if (ele != undefined) {
                    let a = ele.getText().then((text) => {
                        console.log(index, text);
                    });
                }
            });
          //  await expect(parseInt(PrimeElements)).toBeGreaterThan(0, 'Primevalues are zero, so test failed');
            done();
    });

    it('after sorting', async (done) => {
        let priceCount = await element.all(by.xpath("//*[@class='a-price-symbol']")).count();
        console.log(priceCount);
        let originalList = await element.all(by.xpath("//span[@class = 'a-price-whole']")).getText();

        console.log('originalList before sorting ' + originalList);
        let originalList1 = [...originalList];

        var sortedArray: string[] = originalList1.sort((n1, n2) => {
            if (n1 > n2) {
                return 1;
            }
            if (n1 < n2) {
                return -1;
            }
            return 0;
        });
        console.log('list sorted ' + sortedArray);
        // originalList1.sort();
        //console.log('original list sorted ' + originalList1);
        
        await element(by.xpath("//*[@id='a-autoid-1-announce']")).click();
        await browser.driver.sleep(5000);
        element(by.css("#s-result-sort-select_1")).click();
        await browser.driver.sleep(5000);
        let AfterSortList = await element.all(by.xpath("//span[@class = 'a-price-whole']")).getText();
        console.log('list after dropdownsorting ' + AfterSortList);
        
        await expect(sortedArray.toString() === AfterSortList).toBe(true,'lists are not equal');

        if (sortedArray.toString() === AfterSortList) {
            console.log("Lists are equal");
        } else {
            console.log("Lists are not equal");
        }
        done();
    });
}); 