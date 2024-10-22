import request from '../utils/request';

interface CreateFuel {
    name: string;
    type_fuel: number;
    price: number;
    description: string;
}

export const getListFuel = async () => {
    try {
        const res = await request.get('fuel');

        return res;
    } catch (error) {
        throw new Error('Failed get data list fuel');
    }
};

export const createFuel = async ({ name, type_fuel, price, description }: CreateFuel) => {
    try {
        const res = await request.post('fuel', {
            name,
            type_fuel,
            price,
            description,
        });

        return res;
    } catch (error) {
        throw new Error('Failed create fuel');
    }
};

export const getAFuel = async (id: number) => {
    try {
        const res = await request.get(`fuel/${id}`);

        return res;
    } catch (error) {
        throw new Error('Failed get data list fuel');
    }
};

export const updateFuel = async (dataUpdate: {
    id: number;
    name: string;
    type_fuel: number;
    price: number;
    description: string;
}) => {
    try {
        const res = await request.put(`fuel/${dataUpdate.id}`, {
            ...dataUpdate,
        });

        return res;
    } catch (error) {
        throw new Error('Failed create fuel');
    }
};

export const deleteFuel = async (id: number) => {
    try {
        const res = await request.delete(`fuel/${id}`);

        return res;
    } catch (error: any) {
        throw new Error(error);
    }
};
