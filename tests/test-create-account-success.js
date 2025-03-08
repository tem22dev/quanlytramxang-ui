import { Builder, By, Key, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('Create_account_success', function () {
    this.timeout(60000); // Tăng timeout lên 60 giây

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function () {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Chờ 5 giây trước khi đóng trình duyệt
        await driver.quit();
    });

    it('should login successfully and create a new account', async function () {
        await driver.get('http://quanlytramxang.local/login'); // Mở trang login

        // Nhập email & mật khẩu hợp lệ
        await driver.findElement(By.id('login_user_identifier')).sendKeys('admin@gmail.com');
        await driver.findElement(By.id('login_password')).sendKeys('root_admin_9999', Key.ENTER);

        console.log('Waiting for redirect to home page...');
        await driver.wait(until.urlIs('http://quanlytramxang.local/'), 10000);

        // Truy cập trang "Quản lý tài khoản"
        await driver.get('http://quanlytramxang.local/tai-khoan');

        console.log('Navigated to /tai-khoan');

        // Nhấn nút "Thêm mới" (Tìm theo text hoặc class)
        await driver.findElement(By.className('css-dev-only-do-not-override-1d91xpz')).click();

        console.log('Clicked "Thêm mới" button');

        // Chờ form hiển thị
        await driver.wait(until.elementLocated(By.id('form-add-user')), 5000);

        // Nhập thông tin tài khoản mới
        await driver.findElement(By.id('add-user_full_name')).sendKeys('Nguyễn Văn A');
        await driver.findElement(By.id('add-user_email')).sendKeys('nguyenvana@example.com');
        await driver.findElement(By.id('add-user_tel')).sendKeys('0987654321');
        await driver.findElement(By.id('add-user_password')).sendKeys('password123');
        await driver.findElement(By.id('add-user_confirmPass')).sendKeys('password123');

        // Bấm nút "Thêm" (Tìm theo class hoặc text)
        await driver.findElement(By.xpath("//button[contains(text(),'Thêm')]")).click();

        console.log('Clicked "Thêm" button');

        // Chờ thông báo thành công xuất hiện
        const successMessage = await driver.wait(until.elementLocated(By.className('alert-success')), 10000);
        const messageText = await successMessage.getText();
        console.log('Success message:', messageText);

        // Kiểm tra thông báo thành công
        expect(messageText).to.include('Tạo tài khoản thành công');
    });
});
