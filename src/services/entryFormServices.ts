import request from '../utils/request';

interface CreateEntryForm {
    gas_station_id: number;
    detail_entry_form: Array<{
        fuel_id: number;
        quantity: number;
        price: number;
    }>;
}

export const getListEntryForm = async () => {
    try {
        const res = await request.get('entry-form');

        return res;
    } catch (error) {
        throw new Error('Failed get data list entry-form');
    }
};

export const getListEntryFormByIdGasStation = async (id: number) => {
    try {
        const res = await request.get(`entry-form/gas-id/${id}`);

        return res;
    } catch (error) {
        throw new Error('Failed get data list entry-form by id gas station');
    }
};

export const getAEntryForm = async (id: number) => {
    try {
        const res = await request.get(`entry-form/${id}`);

        return res;
    } catch (error) {
        throw new Error('Failed get data list entry-form');
    }
};

export const createEntryForm = async ({ gas_station_id, detail_entry_form }: CreateEntryForm) => {
    try {
        const res = await request.post('entry-form', {
            detail_entry_form,
            gas_station_id,
        });

        return res;
    } catch (error) {
        throw new Error('Failed create entry-form');
    }
};
