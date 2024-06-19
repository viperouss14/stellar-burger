import { feedSlice, feedThunk, initialState } from "./feedSlice";

describe('Тестируем feedSlice', () => {
  const actions = {
    getFeeds: {
      pending: {
        type: feedThunk.pending.type,
        payload: null
      },
      rejected: {
        type: feedThunk.rejected.type,
        error: { message: 'test error' }
      },
      fulfilled: {
        type: feedThunk.fulfilled.type,
        payload: { orders: ['test1', 'test2'], total: 2, totalToday: 1 }
      }
    }
  }
  describe('Тестируем получение ленты заказов', () => {
    it('тестируем состояние pending', () => {
      const newState = feedSlice.reducer(
        { ...initialState },
        actions.getFeeds.pending
      );
      expect(newState.isLoading).toBe(true);
      expect(newState.error).toBe(undefined);
    });
    it('тестируем состояние rejected', () => {
      const newState = feedSlice.reducer(
        { ...initialState },
        actions.getFeeds.rejected
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.error).toBe(actions.getFeeds.rejected.error.message);
    });
    it('тестируем состояние fulfilled', () => {
      const newState = feedSlice.reducer(
        { ...initialState },
        actions.getFeeds.fulfilled
      );
      expect(newState.isLoading).toBe(false);
      expect(newState.feeds).toEqual(actions.getFeeds.fulfilled.payload.orders);
      expect(newState.total).toEqual(actions.getFeeds.fulfilled.payload.total);
      expect(newState.totalToday).toEqual(actions.getFeeds.fulfilled.payload.totalToday);
    });
  })
});
