import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

export const signUpUser = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
    const url = "https://authserviceprovider-hjhncsdmcbhdfzaj.swedencentral-01.azurewebsites.net/api/Auth/signup";
    try {
        console.log(`User Data: ${userData}`);

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
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