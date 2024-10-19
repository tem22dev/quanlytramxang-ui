import request from '../utils/request';

export const createStation = async (formData: FormData) => {
    try {
        const res = await request.post('gas-station', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
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

export const updateStation = async (dataUpdate: {
    id: number;
    user_id: number;
    name_station: string;
    lng: number;
    lat: number;
    address: string;
    image?: string;
}) => {
    try {
        const res = await request.put(`gas-station/${dataUpdate.id}`, {
            ...dataUpdate,
        });
        return res;
    } catch (error: any) {
        throw Error(error);
    }
};

export const deleteStation = async (id: number) => {
    try {
        const res = await request.delete(`gas-station/${id}`);

        return res;
    } catch (error: any) {
        throw new Error(error);
    }
};
