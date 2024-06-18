import { getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TUserOrderSliceState = {
  orders: TOrder[];
  orderRequest: boolean;
  error: string | undefined;
};

export const initialState: TUserOrderSliceState = {
  orders: [],
  orderRequest: false,
  error: undefined
};

export const userOrderThunk = createAsyncThunk(
  'userOrder/getUserOrder',
  getOrdersApi
);

export const userOrderSlice = createSlice({
  name: 'userOrder',
  initialState,
  reducers: {},
  selectors: {
    getUserOrderSelector: (state) => state.orders,
    getUserOrderRequestSelector: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(userOrderThunk.pending, (state) => {
        state.orderRequest = true;
        state.error = undefined;
      })
      .addCase(userOrderThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orders = action.payload;
      })
      .addCase(userOrderThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      });
  }
});

export const { getUserOrderSelector, getUserOrderRequestSelector } =
  userOrderSlice.selectors;
export const userOrderReducer = userOrderSlice.reducer;
