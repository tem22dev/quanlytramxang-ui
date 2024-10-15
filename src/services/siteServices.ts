import request from '../utils/request';

export const counterUser = async () => {
    try {
        const res = await request.get('user/counter');
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
