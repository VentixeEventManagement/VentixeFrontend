import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import signUpReducer from "../features/SignUpSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        signup: signUpReducer,
    }
});