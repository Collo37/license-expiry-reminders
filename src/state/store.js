import { configureStore } from "@reduxjs/toolkit";
import mobileNavSlice from "./mobileNavSlice";
import modalSlice from "./modalSlice";

const store = configureStore({
    reducer: {
        showModal: modalSlice,
        showNav: mobileNavSlice
    }
});

export default store;