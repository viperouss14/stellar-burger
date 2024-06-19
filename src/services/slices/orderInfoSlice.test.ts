import { orderInfoThunk, initialState, orderInfoSlice } from './orderInfoSlice';

describe('Тестируем orderInfoSlice', () => {
  const actions = {
    getOrderInfo: {
      pending: {
        type: orderInfoThunk.pending.type,
        payload: null
      },
      rejected: {
        type: orderInfoThunk.rejected.type,
        error: { message: 'test error' }
      },
      fulfilled: {
        type: orderInfoThunk.fulfilled.type,
        payload: { orders: ['test'] }
      }
    }
  };
  describe('Тестируем получение заказа по номеру', () => {
    it('тестируем состояние pending', () => {
      const newState = orderInfoSlice.reducer(
        { ...initialState },
        actions.getOrderInfo.pending
      );
      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBe(undefined);
    });
    it('тестируем состояние rejected', () => {
      const newState = orderInfoSlice.reducer(
        { ...initialState },
        actions.getOrderInfo.rejected
      );
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe(actions.getOrderInfo.rejected.error.message);
    });
    it('тестируем состояние fulfilled', () => {
      const newState = orderInfoSlice.reducer(
        { ...initialState },
        actions.getOrderInfo.fulfilled
      );
      expect(newState.orderRequest).toBe(false);
      expect(newState.orders).toEqual(
        actions.getOrderInfo.fulfilled.payload.orders
      );
    });
  });
});
