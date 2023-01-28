import { createSlice } from "@reduxjs/toolkit";

const mobileNavSlice = createSlice({
    name: "mobileNavSlice",
    initialState: {
        showNav: false
    },
    reducers: {
        showNav: (state) => {
            state.showNav = true;
        },
        hideNav: (state) => {
            state.showNav = false;
        }
    },
});

export const { showNav, hideNav } = mobileNavSlice.actions;
export default mobileNavSlice.reducer;