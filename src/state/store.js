import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";

const store = configureStore({
    reducer: {
        showModal: modalSlice
    }
});

export default store;