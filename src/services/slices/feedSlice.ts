import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

export const feedThunk = createAsyncThunk('feed/getFeeds', getFeedsApi);
type TFeedSliceState = {
  feeds: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | undefined;
};

const initialState: TFeedSliceState = {
  feeds: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: undefined
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedsSelector: (state) => state.feeds,
    getTotalSelector: (state) => state.total,
    getTotalTodaySelector: (state) => state.totalToday,
    getIsLoadingSelector: (state) => state.isLoading,
    getErrorSelector: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(feedThunk.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(feedThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(feedThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  }
});

export const {
  getFeedsSelector,
  getTotalSelector,
  getTotalTodaySelector,
  getIsLoadingSelector,
  getErrorSelector
} = feedSlice.selectors;

export const feedReducer = feedSlice.reducer;
