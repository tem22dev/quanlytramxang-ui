import request from '../utils/request';

interface LoginParams {
    user_identifier: string;
    password: string;
}

export const getAccount = async () => {
    try {
        const res = await request.get('fetch-user');

        return res;
    } catch (error) {
        throw new Error('Failed get data account');
    }
};

export const login = async ({ user_identifier, password }: LoginParams): Promise<any> => {
    try {
        const res = await request.post('login', {
            user_identifier,
            password,
        });

        return res;
    } catch (error) {
        throw new Error('Failed to login. Please try again later.');
    }
};
