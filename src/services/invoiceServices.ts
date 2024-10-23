import request from '../utils/request';

interface CreateInvoice {
    staff_id: number;
    gas_station_id: number;
    detail_invoice: Array<{
        fuel_id: number;
        quantity: number;
        price: number;
    }>;
}

export const getListInvoice = async () => {
    try {
        const res = await request.get('invoice');

        return res;
    } catch (error) {
        throw new Error('Failed get data list invoice');
    }
};

export const getAInvoice = async (id: number) => {
    try {
        const res = await request.get(`invoice/${id}`);

        return res;
    } catch (error) {
        throw new Error('Failed get data list invoice');
    }
};

export const createInvoice = async ({ staff_id, gas_station_id, detail_invoice }: CreateInvoice) => {
    try {
        const res = await request.post('invoice', {
            staff_id,
            detail_invoice,
            gas_station_id,
        });

        return res;
    } catch (error) {
        throw new Error('Failed create invoice');
    }
};

export const updateInvoice = async (dataUpdate: {
    id: number;
    full_name: string;
    tel: string;
    gas_station_id: number;
    address: string;
    birth_date: string;
    position: string;
}) => {
    try {
        const res = await request.put(`invoice/${dataUpdate.id}`, {
            ...dataUpdate,
        });

        return res;
    } catch (error) {
        throw new Error('Failed update invoice');
    }
};

export const deleteInvoice = async (id: number) => {
    try {
        const res = await request.delete(`invoice/${id}`);

        return res;
    } catch (error: any) {
        throw new Error(error);
    }
};
