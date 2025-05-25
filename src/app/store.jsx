import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import invoiceReducer from "../features/invoiceSlice";
import authReducer from "../features/AuthSlice";
import profileInfoReducer from "../features/ProfileInfoSlice"
import eventsReducer from "../features/eventsSlice";

export const store = configureStore({
        reducer: {
                counter: counterReducer,
                invoices: invoiceReducer,
                auth: authReducer,
                profileInfo: profileInfoReducer,
                events: eventsReducer,
        }
});