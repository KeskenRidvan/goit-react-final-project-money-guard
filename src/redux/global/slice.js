import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingCount: 0,
  isLoading: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) =>
          /(auth|finance)\//.test(action.type) && action.type.endsWith("/pending"),
        (state) => {
          state.pendingCount += 1;
          state.isLoading = state.pendingCount > 0;
        }
      )
      .addMatcher(
        (action) =>
          /(auth|finance)\//.test(action.type) &&
          (action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected")),
        (state) => {
          state.pendingCount = Math.max(0, state.pendingCount - 1);
          state.isLoading = state.pendingCount > 0;
        }
      );
  },
});

export const globalReducer = globalSlice.reducer;
