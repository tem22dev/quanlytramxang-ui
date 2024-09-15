import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
        id: null,
        email: null,
        tel: null,
        full_name: null,
        user_type: null,
        created_at: null,
        updated_at: null,
    },
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAccount: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        doGetAccount: (state, action) => {
            state.isAuthenticated = true;
            state.isLoading = false;
            state.user = action.payload;
        },
        doLogoutAction: (state) => {
            localStorage.removeItem('access_token');
            state.isAuthenticated = false;
            state.user = {
                id: null,
                email: null,
                tel: null,
                full_name: null,
                user_type: null,
                created_at: null,
                updated_at: null,
            };
        },
        doUpdateInfoAction: (state, action) => {
            state.user.tel = action.payload.tel;
            state.user.email = action.payload.email;
            state.user.full_name = action.payload.full_name;
        },
    },
});

export const { doLoginAccount, doGetAccount, doLogoutAction, doUpdateInfoAction } = accountSlice.actions;
export default accountSlice.reducer;
