import store, { rootReducer } from './store';

describe('Тестирование rootReducer', () => {
  test('проверка работы rootReducer', () => {
    const initialState = store.getState();
    const state = rootReducer(undefined, { type: 'unknown' });
    expect(state).toEqual(initialState);
  });
});
