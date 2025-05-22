import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "";

const initialState = {
    token: null,
    loading: false,
    error: null,
    succeeded: false,
    message: "",
}

export const updateUser = createAsyncThunk("user/update", async (user, { rejectWithValue }) => {

    try {

        const response = fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "34023b33-ab56-4925-add5-03666cf294a3"
            }
        });

        if (!response.ok) {
            const error = await response.json();
            console.log("ERROR RESPONSE: ", error);

        };

    } catch (err) {
        return rejectWithValue(err.message || "Something went wrong when updating user.");
    }

});

const updateSlice = createSlice({
    name: "update",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.succeeded = false;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.succeeded = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                tate.loading = false;
                state.error = action.payload;
                state.succeeded = false;
            })
    }
})

