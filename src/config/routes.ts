export interface Routes {
    login: string;
    dashboard: string;
    gasStation: string;
    accounts: string;
    staffs: string;
    fuels: string;
    invoices: string;
    entryForm: string;
}

export const routes: Routes = {
    login: '/login',
    dashboard: '/',
    gasStation: '/tram-xang-dau',
    accounts: '/tai-khoan',
    staffs: '/nhan-vien',
    fuels: '/loai-xang-dau',
    invoices: '/hoa-don',
    entryForm: '/phieu-nhap',
};
