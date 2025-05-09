import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import invoiceReducer from "../features/invoiceSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        invoices: invoiceReducer,    
    }
});