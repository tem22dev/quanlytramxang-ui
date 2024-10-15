import request from '../utils/request';

export const getListUser = async () => {
    try {
        const res = await request.get('user');

        return res;
    } catch (error) {
        throw new Error('Failed get data list user');
    }
};
