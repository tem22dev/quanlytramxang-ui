import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Login_FailInvalidEmail', function () {
    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit();
    });

    it('should fail to login with notfound email', async function () {
        await driver.get('http://quanlytramxang.local/login');

        await driver.findElement(By.id('login_user_identifier')).sendKeys('admin@gmail.com');
        await driver.findElement(By.id('login_password')).sendKeys('root_admin_9999', Key.RETURN);


        // Kiểm tra vẫn ở trang đăng nhập
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('http://quanlytramxang.local/login');
    });
});
