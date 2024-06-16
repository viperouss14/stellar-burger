import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const orderBurgerThunk = createAsyncThunk(
  'postOrder/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);
type TOrderSliceState = {
  order: TOrder | null;
  orderRequest: boolean;
  error: string | undefined;
};

const initialState: TOrderSliceState = {
  order: null,
  orderRequest: false,
  error: undefined
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.orderRequest = false;
      state.error = undefined;
    }
  },
  selectors: {
    getOrderSelector: (state) => state.order,
    getOrderRequestSelector: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.orderRequest = true;
        state.error = undefined;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message ?? 'Ошибка при отправке заказа';
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
export const { getOrderSelector, getOrderRequestSelector } =
  orderSlice.selectors;
