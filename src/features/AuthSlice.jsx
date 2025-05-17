import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    verified: false,
    loading: false,
    error: null,
}
export const sendEmailRequest = createAsyncThunk("auth/sendemail", async (email, { rejectWithValue }) => {
    const url = `https://authserviceprovider-hjhncsdmcbhdfzaj.swedencentral-01.azurewebsites.net/api/Auth/sendrequest?email=${email}`;
    try {

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            const error = await response.json();
            const details = error.details;

            if (Array.isArray(details)) {
                details = [...new Set(details)];
                return rejectWithValue(details);
            } else {
                return rejectWithValue([details])
            }
        }

        return "Verification email sent successfully.";

    } catch (err) {
        return rejectWithValue(err.message || "Something went wrong when sending email.");
    }
})

export const verifyCode = createAsyncThunk("auth/verifyemail", async ({ email, code }, { rejectWithValue }) => {
    const url = "https://authserviceprovider-hjhncsdmcbhdfzaj.swedencentral-01.azurewebsites.net/api/Auth/verify";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code })
        });

        console.log("JSON: ", JSON.stringify({ email, code }));


        if (!response.ok) {
            const error = await response.json()
            const details = error.detail || error.message;

            if (Array.isArray(details)) {
                details = [...new Set(details)];
                return rejectWithValue(details);
            } else {
                return rejectWithValue([details || "Faild to verify."]);
            }
        }

        return "Verification successful";

    } catch (err) {
        return rejectWithValue(err.message || "Something went wrong when trying to verify.")
    }
});

export const signUpUser = createAsyncThunk("auth/signup", async ({ email, password }, { rejectWithValue }) => {
    const url = "https://authserviceprovider-hjhncsdmcbhdfzaj.swedencentral-01.azurewebsites.net/api/Auth/signup";
    try {
        console.log(`User Data: ${email} ${password}`);

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json()
            const details = error.detail;

            if (Array.isArray(details)) {
                details = [...new Set(details)];
                return rejectWithValue(details);
            } else {
                return rejectWithValue([details || "Signup failed."]);
            }
        }

        const json = await response.json();
        return json;

    } catch (err) {
        return rejectWithValue(err.message || "Network error");
    }
})

export const signInUser = createAsyncThunk("auth/signin", async (userData, { rejectWithValue }) => {

    const url = "https://authserviceprovider-hjhncsdmcbhdfzaj.swedencentral-01.azurewebsites.net/api/Auth/signin";
    try {

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const error = await response.json()

            return rejectWithValue(error.detail || "Sign in failed.");
        }

        const json = await response.json();
        return json;

    } catch (err) {
        return rejectWithValue(err.message || "Network error");
    }
})

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Send verification email
            .addCase(sendEmailRequest.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendEmailRequest.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(sendEmailRequest.rejected, (state) => {
                state.loading = false
            })

            // Verify code
            .addCase(verifyCode.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyCode.fulfilled, (state, action) => {
                state.loading = false
                state.verified = action.payload
            })
            .addCase(verifyCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            // Sign Up User
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            // Sign In User
            .addCase(signInUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(signInUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })
    },
});


export const { signOut } = authSlice.actions;
export default authSlice.reducer;