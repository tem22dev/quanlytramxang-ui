import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isCollapsedSidebar: false,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isCollapsedSidebar = !state.isCollapsedSidebar;
        },
    },
});

export const { toggleSidebar } = appSlice.actions;
export default appSlice.reducer;
