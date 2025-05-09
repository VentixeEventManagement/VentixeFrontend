import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import invoiceReducer from "../features/invoiceSlice";
import authReducer from "../features/AuthSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        invoices: invoiceReducer, 
        auth: authReducer,
    }
});