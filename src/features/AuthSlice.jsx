import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://authserviceprovider-hjhncsdmcbhdfzaj.swedencentral-01.azurewebsites.net/api/Auth";
const accountUrl = "https://authserviceprovider-hjhncsdmcbhdfzaj.swedencentral-01.azurewebsites.net/api/Auth/getaccount?userId=";


const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    succeeded: false,
    message: "",
}

export const getAccountInfo = createAsyncThunk("auth/accountInfo", async (userId, { rejectWithValue }) => {

    try {
        const response = await fetch(`${accountUrl}${userId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            const error = await response.json();
            let details = error.details;


            if (Array.isArray(details)) {
                details = [...new Set(details)];
                return rejectWithValue(details);
            } else {
                return rejectWithValue([details])
            }
        }

        const json = await response.json();
        return json.account;

    } catch (err) {
        return rejectWithValue(err.message || "Something went wrong when sending email.");
    }
})
export const sendEmailRequest = createAsyncThunk("auth/sendemail", async (email, { rejectWithValue }) => {

    try {
        const response = await fetch(`${url}/sendrequest?email=${email}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
            const error = await response.json();
            let details = error.details;


            if (Array.isArray(details)) {
                details = [...new Set(details)];
                return rejectWithValue(details);
            } else {
                return rejectWithValue([details])
            }
        }

        return response.ok;

    } catch (err) {
        return rejectWithValue(err.message || "Something went wrong when sending email.");
    }
})

export const verifyCode = createAsyncThunk("auth/verifycode", async ({ email, code }, { rejectWithValue }) => {

    try {
        const response = await fetch(`${url}/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code })
        });

        if (!response.ok) {
            const error = await response.json()
            return rejectWithValue(error.detail)
        }

        return response.ok;

    } catch (err) {
        return rejectWithValue(err.message || "Something went wrong when trying to verify.")
    }
});

export const signUpUser = createAsyncThunk("auth/signup", async ({ email, password }, { rejectWithValue }) => {

    try {
        console.log(`User Data: ${email} ${password}`);

        const response = await fetch(`${url}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json()
            let details = error.detail || error.message;

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

    try {

        const response = await fetch(`${url}/signin`, {
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

        resetStatus: (state) => {
            state.loading = false;
            state.error = null;
            state.succeeded = false;
            state.message = "";
        },

        simulateLogin: (state) => {
            state.user = { id: 1, name: "Developer" };
            state.token = "fake-token";
            state.isAuthenticated = true;
            state.error = null;
        },

    },
    extraReducers: (builder) => {
        builder

            // Get account info
            .addCase(getAccountInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.succeeded = false;
            })
            .addCase(getAccountInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.succeeded = true;
                state.user = action.payload;
            })
            .addCase(getAccountInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.succeeded = false;
            })

            // Send verification email
            .addCase(sendEmailRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.succeeded = false;
            })
            .addCase(sendEmailRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.succeeded = action.payload;
            })
            .addCase(sendEmailRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.succeeded = false;
            })

            // Verify code
            .addCase(verifyCode.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.succeeded = false;
            })
            .addCase(verifyCode.fulfilled, (state, action) => {
                state.loading = false
                state.succeeded = action.payload
            })
            .addCase(verifyCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            // Sign Up User
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.succeeded = false;
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
                state.error = null;
                state.succeeded = false;
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

export const { signOut, resetStatus, simulateLogin } = authSlice.actions;
export default authSlice.reducer;