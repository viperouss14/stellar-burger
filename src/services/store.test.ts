import store, { rootReducer } from './store';

describe('Тестирование rootReducer', () => {
  test('проверка работы rootReducer', () => {
    const initialState = store.getState();
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(initialState);
  });
});
