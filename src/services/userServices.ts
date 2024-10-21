import request from '../utils/request';

interface CreateUser {
    full_name: string;
    tel: string;
    email: string;
    password: string;
}

export const getListUser = async () => {
    try {
        const res = await request.get('user');

        return res;
    } catch (error) {
        throw new Error('Failed get data list user');
    }
};

export const createUser = async ({ full_name, tel, email, password }: CreateUser) => {
    try {
        const res = await request.post('user', {
            full_name,
            tel,
            email,
            password,
        });

        return res;
    } catch (error) {
        throw new Error('Failed create user');
    }
};

export const updateUser = async (dataUpdate: {
    id: number;
    full_name: string;
    tel: string;
    email: string;
    password?: string;
}) => {
    try {
        const res = await request.put(`user/${dataUpdate.id}`, {
            ...dataUpdate,
        });

        return res;
    } catch (error) {
        throw new Error('Failed create user');
    }
};

export const deleteUser = async (id: number) => {
    try {
        const res = await request.delete(`user/${id}`);

        return res;
    } catch (error: any) {
        throw new Error(error);
    }
};
