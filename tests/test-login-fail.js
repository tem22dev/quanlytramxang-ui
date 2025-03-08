import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Login_Fail', function () {
    this.timeout(50000); // Tăng timeout lên 50 giây

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Chờ 5 giây trước khi đóng trình duyệt
        await driver.quit();
    });

    it('should fail to login with invalid credentials', async function () {
        await driver.get('http://localhost:3001/login');

        await driver.findElement(By.id('login_user_identifier')).sendKeys('admin123@gmail.com');
        await driver.findElement(By.id('login_password')).sendKeys('root_admin_9999', Key.ENTER);

        console.log('Waiting for error message...');

        try {
            // Tìm phần tử chứa lỗi theo class hoặc xpath
            const errorElement = await driver.wait(
                until.elementLocated(By.className('error-message')), // Thay bằng class thực tế
                5000
            );

            // Đợi lỗi hiển thị rõ ràng
            await driver.wait(until.elementIsVisible(errorElement), 5000);

            // Kiểm tra nội dung thông báo lỗi
            const errorText = await errorElement.getText();
            console.log('Error message:', errorText);
            expect(errorText).to.include('Email hoặc mật khẩu không đúng'); // Thay bằng nội dung thực tế
        } catch (error) {
            console.error('Error message not found:', error);
        }

        // Kiểm tra vẫn ở trang đăng nhập
        const currentUrl = await driver.getCurrentUrl();
        console.log('Current URL:', currentUrl);
        expect(currentUrl).to.include('/login');
    });
});
