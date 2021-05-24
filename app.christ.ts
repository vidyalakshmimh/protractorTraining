import { browser, by, element} from 'protractor';
import { __awaiter } from 'tslib';

describe('flatmarketPage',()=>{

beforeEach(()=>{
    var originalTimeout;
    browser.ignoreSynchronization = true;
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
})

it('check the three columns are there or not', async(done)=>{
    browser.get('https://christophercliff.com/flatmarket');
    await browser.sleep(5000);
    let sec= await element.all(by.tagName("section")).then((ele)=> {
        console.log(ele.length, "...............")
         expect(ele.length).toEqual(3);
    });
    

    await browser.sleep(5000);
    done();
})
})