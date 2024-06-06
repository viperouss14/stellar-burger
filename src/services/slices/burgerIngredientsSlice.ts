import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TBurgerState = {
  burgerIngredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

const initialState: TBurgerState = {
  burgerIngredients: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  getIngredientsApi
);

const burgerIngredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {},
  selectors: {
    burgerIngredients: (state) => state.burgerIngredients,
    loading: (state) => state.loading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.burgerIngredients = action.payload;
        state.loading = false;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.loading = false;
      });
  }
});

export const { loading, burgerIngredients } = burgerIngredientsSlice.selectors;
export const ingredientsReducer = burgerIngredientsSlice.reducer;
