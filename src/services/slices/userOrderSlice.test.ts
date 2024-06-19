import { userOrderThunk, userOrderSlice, initialState } from "./userOrderSlice";

describe('Тестируем userOrderSlice', () => {
  const actions = {
    getUserOrders: {
      pending: {
        type: userOrderThunk.pending.type,
        payload: null
      },
      rejected: {
        type: userOrderThunk.rejected.type,
        error: { message: 'test error' }
      },
      fulfilled: {
        type: userOrderThunk.fulfilled.type,
        payload: { orders: ['test 1', 'test 2'] }
      }
    }
  };
  describe('Тестируем получение списка заказов', () => {
    it('тестируем состояние pending', () => {
      const newState = userOrderSlice.reducer(
        { ...initialState },
        actions.getUserOrders.pending
      );
      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBe(undefined);
    });
    it('тестируем состояние rejected', () => {
      const newState = userOrderSlice.reducer(
        { ...initialState },
        actions.getUserOrders.rejected
      );
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe(actions.getUserOrders.rejected.error.message);
    });
    it('тестируем состояние fulfilled', () => {
      const newState = userOrderSlice.reducer(
        { ...initialState },
        actions.getUserOrders.fulfilled
      );
      expect(newState.orderRequest).toBe(false);
      expect(newState.orders).toEqual(actions.getUserOrders.fulfilled.payload);
    });
  });
});
