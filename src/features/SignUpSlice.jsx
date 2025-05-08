import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    message: null,
    error: null,
}

export const signUpUser = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
    const url = "https://localhost:7277/api/Auth/signup";
    try {
        console.log(`User Data: ${userData}`);

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        if (!response.ok) {
            const error = await response.json()
            return rejectWithValue(error.detail || "Signup failed.");
        }

        const json = await response.json();
        return json;

    } catch (err) {
        console.log("TEST LOG: ", err.message);

        return rejectWithValue(err.message || "Network error");
    }
})

const signUpSlice = createSlice({
    name: "signup",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
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
            });
    },
});

export default signUpSlice.reducer;