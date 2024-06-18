import { burgerIngredientsSlice, getIngredients, initialState } from "./burgerIngredientsSlice";

describe('Тестирование burgerIngredientsSlice', () => {
  const actions = {
    getIngredients: {
      pending: {
        type: getIngredients.pending.type,
        payload: null
      },
      rejected: {
        type: getIngredients.rejected.type,
        error: { message: 'test error' }
      },
      fulfilled: {
        type: getIngredients.fulfilled.type,
        payload: ['test1', 'test2']
      }
    }
  };

  describe('тестируем получение ингредиентов', () => {
    it('тестируем состояние pending', () => {
      const newState = burgerIngredientsSlice.reducer(
        { ...initialState },
        actions.getIngredients.pending
      );
      expect(newState.loading).toBe(true);
      expect(newState.error).toBe(null);
    });
    it('тестируем состояние rejected', () => {
      const newState = burgerIngredientsSlice.reducer(
        { ...initialState },
        actions.getIngredients.rejected
      );
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(actions.getIngredients.rejected.error.message);
    });
    it('тестируем состояние fulfilled', () => {
      const newState = burgerIngredientsSlice.reducer(
        { ...initialState },
        actions.getIngredients.fulfilled
      );
      expect(newState.loading).toBe(false);
      expect(newState.error).toBe(null);
      expect(newState.burgerIngredients).toEqual(actions.getIngredients.fulfilled.payload);
    });
  });
});
