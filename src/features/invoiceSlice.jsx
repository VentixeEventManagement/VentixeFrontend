import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//--Denna fil hanterar faktura-data och API-anrop till/från invoiceprovider--\\

//But ut nedan sedan mot den publika.
const APIBaseUrl = "http://localhost:5178/api/invoice";

//Visa alla fakturor:
export const fetchInvoices = createAsyncThunk("invoices/fetchAll", async () => {
  const response = await axios.get(`${APIBaseUrl}/getAll`);
  return response.data;
});

//Visa en faktura:
export const fetchInvoiceById = createAsyncThunk(
  "invoices/fetchById",
  async (id) => {
    const response = await axios.get(`${APIBaseUrl}/${id}`);
    return response.data;
  }
);

//Editera en faktura:
export const updateInvoice = createAsyncThunk(
  "invoices/update",
  async ({ id, updatedInvoice }, { dispatch }) => {
    const response = await axios.put(`${APIBaseUrl}/${id}`, updatedInvoice);
    dispatch(fetchInvoices());
    return response.data;
  }
);

//Delete
export const deleteInvoice = createAsyncThunk(
  "invoices/delete",
  async (id, { dispatch }) => {
    await axios.delete(`${APIBaseUrl}/${id}`);

    //Hämtar uppdaterad lista:
    dispatch(fetchInvoices());
  }
);
const invoiceSlice = createSlice({
  name: "invoices",
  initialState: {
    items: [],
    selected: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchInvoiceById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(updateInvoice.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(updateInvoice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteInvoice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default invoiceSlice.reducer;
