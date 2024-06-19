import { orderBurgerThunk, initialState, orderSlice } from "./orderSlice";

describe('Тестируем orderSlice', () => {
  const actions = {
    postOrder: {
      pending: {
        type: orderBurgerThunk.pending.type,
        payload: null
      },
      rejected: {
        type: orderBurgerThunk.rejected.type,
        error: { message: 'test error' }
      },
      fulfilled: {
        type: orderBurgerThunk.fulfilled.type,
        payload: { order: { number: '123' } }
      }
    }
  };

  describe('Тестируем отправку заказа', () => {
    it('тестируем состояние pending', () => {
      const newState = orderSlice.reducer(
        { ...initialState },
        actions.postOrder.pending
      );
      expect(newState.orderRequest).toBe(true);
      expect(newState.error).toBe(undefined);
    });
    it('тестируем состояние rejected', () => {
      const newState = orderSlice.reducer(
        { ...initialState },
        actions.postOrder.rejected
      );
      expect(newState.orderRequest).toBe(false);
      expect(newState.error).toBe(actions.postOrder.rejected.error.message);
    });
    it('тестируем состояние fulfilled', () => {
      const newState = orderSlice.reducer(
        { ...initialState },
        actions.postOrder.fulfilled
      );
      expect(newState.orderRequest).toBe(false);
      expect(newState.order?.number).toBe(actions.postOrder.fulfilled.payload.order.number);
    });
  });
});
