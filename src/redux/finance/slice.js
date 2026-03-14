import { createSlice } from "@reduxjs/toolkit";
import { refreshUser, signIn, signOut, signUp } from "../auth/operations";
import { getYearOptions } from "../../utils/constants";
import {
  addTransaction,
  deleteTransaction,
  fetchCurrencyRates,
  fetchTransactionCategories,
  fetchTransactions,
  fetchTransactionsSummary,
  updateTransaction,
} from "./operations";

const currentDate = new Date();

const initialState = {
  transactions: [],
  categories: [],
  totalBalance: 0,
  statistics: null,
  statisticsPeriod: {
    month: currentDate.getMonth() + 1,
    year: getYearOptions()[0],
  },
  currencyRates: [],
  currencyFetchedAt: null,
  filter: {
    type: "ALL",
    categoryId: "ALL",
    search: "",
  },
  error: null,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setTransactionTypeFilter(state, action) {
      state.filter.type = action.payload;

      if (action.payload === "ALL") {
        state.filter.categoryId = "ALL";
      }
    },
    setTransactionCategoryFilter(state, action) {
      state.filter.categoryId = action.payload;
    },
    setTransactionSearchFilter(state, action) {
      state.filter.search = action.payload;
    },
    setStatisticsPeriod(state, action) {
      state.statisticsPeriod = action.payload;
    },
    resetFinanceState() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.error = null;
      })
      .addCase(fetchTransactionsSummary.fulfilled, (state, action) => {
        state.statistics = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrencyRates.fulfilled, (state, action) => {
        state.currencyRates = action.payload.rates;
        state.currencyFetchedAt = action.payload.fetchedAt;
        state.error = null;
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.totalBalance = action.payload.balanceAfter;
        state.error = null;
      })
      .addCase(updateTransaction.fulfilled, (state, action) => {
        state.totalBalance = action.payload.balanceAfter;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.totalBalance = action.payload.user.balance;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.totalBalance = action.payload.user.balance;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.totalBalance = action.payload.balance;
      })
      .addCase(signOut.fulfilled, () => initialState)
      .addCase(signOut.rejected, () => initialState)
      .addMatcher(
        (action) =>
          action.type.startsWith("finance/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const {
  resetFinanceState,
  setStatisticsPeriod,
  setTransactionCategoryFilter,
  setTransactionSearchFilter,
  setTransactionTypeFilter,
} = financeSlice.actions;

export const financeReducer = financeSlice.reducer;
