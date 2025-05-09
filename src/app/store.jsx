import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import authReducer from "../features/AuthSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
    }
});