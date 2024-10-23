import request from '../utils/request';

export const counterUser = async () => {
    try {
        const res = await request.get('user/counter');
        return res;
    } catch (error: any) {
        throw Error(error);
    }
};

export const counterInvoices = async () => {
    try {
        const res = await request.get('invoice/counter');
        return res;
    } catch (error: any) {
        throw Error(error);
    }
};

export const counterStation = async () => {
    try {
        const res = await request.get('gas-station/counter');
        return res;
    } catch (error: any) {
        throw Error(error);
    }
};

export const counterStaff = async () => {
    try {
        const res = await request.get('staff/counter');
        return res;
    } catch (error: any) {
        throw Error(error);
    }
};

export const searchMap = async (url: string) => {
    try {
        const res = await request.get(url, {
            withCredentials: false,
        });
        return res;
    } catch (error: any) {
        throw Error(error);
    }
};

export const uploadFile = async (formData: FormData) => {
    try {
        const res = await request.post('upload-file', formData, {
            headers: {
                'Content-Type': 'Multipart/form-data',
            },
        });

        return res;
    } catch (error: any) {
        throw Error(error);
    }
};

export const searchGasStation = async (query: string) => {
    try {
        const res = await request.get(`gas-station/search?query=${query}`);

        return res;
    } catch (error: any) {
        throw Error(error);
    }
};
