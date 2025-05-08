import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
}

export const signInUser = createAsyncThunk("auth/signin", async (userData, { rejectWithValue }) => {
    const url = "https://localhost:7277/api/Auth/signin";
    try {
        console.log("User Data: ", userData);

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const error = await response.json()
            console.log("SIGN IN ERROR : ", error.detail);

            return rejectWithValue(error.detail || "Sign in failed.");
        }

        const json = await response.json();
        return json;

    } catch (err) {
        return rejectWithValue(err.message || "Network error");
    }
})

const signInSlice = createSlice({
    name: "signin",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export default signInSlice.reducer;