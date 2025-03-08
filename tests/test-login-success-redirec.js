import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Login_Success', function () {
    this.timeout(50000); // Tăng timeout lên 50 giây để tránh lỗi timeout

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Chờ 5 giây trước khi đóng trình duyệt
        await driver.quit();
    });

    it('should login successfully and navigate to home page', async function () {
        await driver.get('http://quanlytramxang.local/login'); // Mở trang login

        // Nhập email và mật khẩu hợp lệ
        await driver.findElement(By.id('login_user_identifier')).sendKeys('admin@gmail.com');
        await driver.findElement(By.id('login_password')).sendKeys('root_admin_9999', Key.ENTER);

        console.log('Waiting for redirect to home page...');

        // Chờ điều hướng đến trang chính sau khi đăng nhập
        await driver.wait(until.urlIs('http://quanlytramxang.local/'), 10000);

        // Kiểm tra URL hiện tại có đúng không
        const currentUrl = await driver.getCurrentUrl();
        console.log('Current URL:', currentUrl);
        expect(currentUrl).to.equal('http://quanlytramxang.local/');
    });
});
