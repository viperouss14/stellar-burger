import { getOrderByNumberApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderInfoSliceState = {
  orders: TOrder[] | null;
  orderRequest: boolean;
  error: string | undefined;
};

const initialState: TOrderInfoSliceState = {
  orders: [],
  orderRequest: false,
  error: undefined
};

export const orderInfoThunk = createAsyncThunk(
  'orderByNumber/getOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderInfoSlice = createSlice({
  name: 'orderInfo',
  initialState,
  reducers: {},
  selectors: {
    getOrderInfoSelector: (state) => state.orders,
    getOrderInfoRequestSelector: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderInfoThunk.pending, (state) => {
        state.orderRequest = true;
        state.error = undefined;
      })
      .addCase(orderInfoThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orders = action.payload.orders;
      })
      .addCase(orderInfoThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message;
      });
  }
});

export const { getOrderInfoSelector, getOrderInfoRequestSelector } =
  orderInfoSlice.selectors;
export const orderInfoReducer = orderInfoSlice.reducer;
