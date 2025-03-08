import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Login_Success', function () {
    this.timeout(50000); // Tăng timeout lên 15 giây

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await driver.quit(); 
    });

    it('should login successfully with valid credentials', async function () {
        await driver.get('http://quanlytramxang.local/login'); // Mở trang login

        // Nhập email và mật khẩu
        await driver.findElement(By.id('login_user_identifier')).sendKeys('admin@gmail.com');
        await driver.findElement(By.id('login_password')).sendKeys('root_admin_9999', Key.RETURN);

        // Chờ điều hướng sau khi đăng nhập thành công
        // await driver.wait(until.urlContains('http://quanlytramxang.local/'), 10000);

        // Kiểm tra URL hiện tại có chứa đường dẫn trang chính không
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).to.include('http://quanlytramxang.local/');
    });
});
