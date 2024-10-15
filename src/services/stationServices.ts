import request from '../utils/request';

export const createStation = async (formData: FormData) => {
    try {
        const res = await request.post('gas-station', formData, {
            headers: {
                'Content-Type': 'Multipart/form-data',
            },
        });
        return res;
    } catch (error: any) {
        throw Error(error);
    }
};

export const getListStation = async () => {
    try {
        const res = await request.get('gas-station');

        return res;
    } catch (error: any) {
        throw new Error(error);
    }
};
