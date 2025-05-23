import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://profileserviceprovider.azurewebsites.net/api/User";

const initialState = {
    profileInfo: null,
    token: null,
    loading: false,
    error: null,
    succeeded: false,
    message: "",
}

export const getUserInfo = createAsyncThunk("user/get", async (userId, { rejectWithValue }) => {

    try {

        const response = await fetch(`${url}/get?userId=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": "34023b33-ab56-4925-add5-03666cf294a3"
            }
        });

        if (!response.ok) {
            const error = await response.json();
            let errors = error.errors;

            if (errors) {
                return rejectWithValue(errors.UserId[0]);
            }

            return rejectWithValue(error);

        };

        const json = await response.json();
        return json.result;

    } catch (err) {
        return rejectWithValue(err.message || "Something went wrong when fetching the user.");
    }
})

export const updateUser = createAsyncThunk("user/update", async (user, { rejectWithValue }) => {

    try {
        const formData = new FormData();
        formData.append("userId", user.userId);
        formData.append("firstName", user.firstName);
        formData.append("lastName", user.lastName);

        if (user.selectedFile) {
            formData.append("profileImageUri", user.selectedFile, user.selectedFile.name);
        }

        for (let pair of formData.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }


        const response = await fetch(`${url}/update`, {
            method: "POST",
            headers: {
                // "Content-Type": "application/json",
                "X-API-KEY": "34023b33-ab56-4925-add5-03666cf294a3"
            },
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            let errors = error.errors;

            if (errors) {
                return rejectWithValue(errors.UserId[0]);
            }

            return rejectWithValue(error);

        };

        const json = await response.json();
        return json;

    } catch (err) {
        return rejectWithValue(err.message || "Something went wrong when updating user.");
    }

});

const updateSlice = createSlice({
    name: "profileInfo",
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder

            // Get profile information
            .addCase(getUserInfo.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.succeeded = false;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.loading = false;
                state.profileInfo = action.payload;
                state.succeeded = true;
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.succeeded = false;
            })

            // Update profile information
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.succeeded = false;
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.loading = false;
                state.succeeded = true;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.succeeded = false;
            })
    }
})

export default updateSlice.reducer;