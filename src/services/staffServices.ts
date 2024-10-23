import request from '../utils/request';

interface CreateStaff {
    full_name: string;
    tel: string;
    gas_station_id: number;
    address: string;
    birth_date: string;
    position: string;
}

export const getListStaff = async () => {
    try {
        const res = await request.get('staff');

        return res;
    } catch (error) {
        throw new Error('Failed get data list staff');
    }
};

export const getListStaffByGasStationId = async (id: number) => {
    try {
        const res = await request.get(`staff/gas-station/${id}`);

        return res;
    } catch (error) {
        throw new Error('Failed get data list staff');
    }
};

export const getAStaff = async (id: number) => {
    try {
        const res = await request.get(`staff/${id}`);

        return res;
    } catch (error) {
        throw new Error('Failed get data list staff');
    }
};

export const createStaff = async ({ full_name, tel, gas_station_id, address, birth_date, position }: CreateStaff) => {
    try {
        const res = await request.post('staff', {
            full_name,
            tel,
            gas_station_id,
            address,
            birth_date,
            position,
        });

        return res;
    } catch (error) {
        throw new Error('Failed create staff');
    }
};

export const updateStaff = async (dataUpdate: {
    id: number;
    full_name: string;
    tel: string;
    gas_station_id: number;
    address: string;
    birth_date: string;
    position: string;
}) => {
    try {
        const res = await request.put(`staff/${dataUpdate.id}`, {
            ...dataUpdate,
        });

        return res;
    } catch (error) {
        throw new Error('Failed update staff');
    }
};

export const deleteStaff = async (id: number) => {
    try {
        const res = await request.delete(`staff/${id}`);

        return res;
    } catch (error: any) {
        throw new Error(error);
    }
};
