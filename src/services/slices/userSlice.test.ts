import {
  registerUserThunk,
  loginUserThunk,
  logoutThunk,
  updateUserThunk,
  initialState,
  userSlice
} from './userSlice';

describe('Тестируем userSlice', () => {
  const actions = {
    registerUser: {
      pending: {
        type: registerUserThunk.pending.type,
        payload: null
      },
      rejected: {
        type: registerUserThunk.rejected.type,
        error: { message: 'test error' }
      },
      fulfilled: {
        type: registerUserThunk.fulfilled.type,
        payload: { user: { name: 'testuser', email: 'test@test.ru' } }
      }
    },

    loginUser: {
      pending: {
        type: loginUserThunk.pending.type,
        payload: null
      },
      rejected: {
        type: loginUserThunk.rejected.type,
        error: { message: 'test error' }
      },
      fulfilled: {
        type: loginUserThunk.fulfilled.type,
        payload: { user: { name: 'testuser', email: 'test@test.ru' } }
      }
    },

    updateUser: {
      pending: {
        type: updateUserThunk.pending.type,
        payload: null
      },
      rejected: {
        type: updateUserThunk.rejected.type,
        error: { message: 'test error' }
      },
      fulfilled: {
        type: updateUserThunk.fulfilled.type,
        payload: { user: { name: 'testuser', email: 'test@test.ru' } }
      }
    },

    logoutUser: {
      pending: {
        type: logoutThunk.pending.type,
        payload: null
      },
      rejected: {
        type: logoutThunk.rejected.type,
        error: { message: 'test error' }
      },
      fulfilled: {
        type: logoutThunk.fulfilled.type,
        payload: null
      }
    }
  };

  describe('Тестируем регистрацию пользователя', () => {
    it('тестируем состояние pending', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.registerUser.pending
      );
      expect(newState.error).toBe(undefined);
    });

    it('тестируем состояние rejected', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.registerUser.rejected
      );
      expect(newState.error).toBe(actions.registerUser.rejected.error.message);
    });

    it('тестируем состояние fulfilled', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.registerUser.fulfilled
      );
      expect(newState.error).toBe(undefined);
      expect(newState.userData).toEqual(
        actions.registerUser.fulfilled.payload.user
      );
    });
  });

  describe('Тестируем вход пользователя', () => {
    it('тестируем состояние pending', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.loginUser.pending
      );
      expect(newState.error).toBe(undefined);
    });

    it('тестируем состояние rejected', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.loginUser.rejected
      );
      expect(newState.error).toBe(actions.loginUser.rejected.error.message);
    });

    it('тестируем состояние fulfilled', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.loginUser.fulfilled
      );
      expect(newState.userData).toEqual(
        actions.loginUser.fulfilled.payload.user
      );
    });
  });

  describe('Тестируем обновление пользователя', () => {
    it('тестируем состояние pending', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.updateUser.pending
      );
      expect(newState.error).toBe(undefined);
    });

    it('тестируем состояние rejected', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.updateUser.rejected
      );
      expect(newState.error).toBe(actions.updateUser.rejected.error.message);
    });

    it('тестируем состояние fulfilled', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.updateUser.fulfilled
      );
      expect(newState.userData).toEqual(
        actions.updateUser.fulfilled.payload.user
      );
    });
  });

  describe('Тестируем выход пользователя', () => {
    it('тестируем состояние pending', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.logoutUser.pending
      );
      expect(newState.error).toBe(undefined);
    });

    it('тестируем состояние rejected', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.logoutUser.rejected
      );
      expect(newState.error).toBe(actions.logoutUser.rejected.error.message);
    });

    it('тестируем состояние fulfilled', () => {
      const newState = userSlice.reducer(
        { ...initialState },
        actions.logoutUser.fulfilled
      );
      expect(newState.userData).toEqual(null);
    });
  });
});
