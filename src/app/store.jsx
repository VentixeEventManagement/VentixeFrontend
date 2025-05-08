import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import signUpReducer from "../features/SignUpSlice"
import signInReducer from "../features/SignInSlice"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        signup: signUpReducer,
        signin: signInReducer,
    }
});