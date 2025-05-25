// src/Redux/slice/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const fetchSellerOrders = createAsyncThunk(
  'sellerDashboard/fetchSellerOrders',
  async ( _, { rejectWithValue }) => {
    try {
      const res = await api.get(`/getSellerOrder`);
      const sortedOrders = res.data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return sortedOrders;
    } 
    catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const sellerDashboardReducer = createSlice({
  name: 'sellerDashboard',
  initialState: {
    orders: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSellerOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export default sellerDashboardReducer.reducer;
