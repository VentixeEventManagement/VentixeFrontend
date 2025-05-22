import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const APIBaseUrl = "https://eventprovider20250513014429-abhdcxdthwhpc3dp.swedencentral-01.azurewebsites.net/api/event";

// Hämta alla event
export const fetchEvents = createAsyncThunk("events/fetchAll", async () => {
  const response = await axios.get(`${APIBaseUrl}`);
  return response.data;
});

// Hämta ett event
export const fetchEventById = createAsyncThunk(
  "events/fetchById",
  async (id) => {
    const response = await axios.get(`${APIBaseUrl}/${id}`);
    return response.data;
  }
);

// Skapa ett event
export const createEvent = createAsyncThunk(
  "events/create",
  async (newEvent, { dispatch }) => {
    const response = await axios.post(`${APIBaseUrl}`, newEvent);
    dispatch(fetchEvents());
    return response.data;
  }
);

// Uppdatera ett event
export const updateEvent = createAsyncThunk(
  "events/update",
  async ({ id, updatedEvent }, { dispatch }) => {
    const response = await axios.put(`${APIBaseUrl}/${id}`, updatedEvent);
    dispatch(fetchEvents());
    return response.data;
  }
);

// Ta bort ett event
export const deleteEvent = createAsyncThunk(
  "events/delete",
  async (id, { dispatch }) => {
    await axios.delete(`${APIBaseUrl}/${id}`);
    dispatch(fetchEvents());
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState: {
    items: [],
    selected: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;