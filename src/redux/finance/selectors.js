import { createSelector } from "@reduxjs/toolkit";

export const selectTransactions = (state) => state.finance.transactions;
export const selectCategories = (state) => state.finance.categories;
export const selectTotalBalance = (state) => state.finance.totalBalance;
export const selectStatistics = (state) => state.finance.statistics;
export const selectStatisticsPeriod = (state) => state.finance.statisticsPeriod;
export const selectCurrencyRates = (state) => state.finance.currencyRates;
export const selectCurrencyFetchedAt = (state) => state.finance.currencyFetchedAt;
export const selectTransactionFilter = (state) => state.finance.filter;

export const selectCategoriesMap = createSelector([selectCategories], (categories) =>
  categories.reduce((accumulator, category) => {
    accumulator[category.id] = category;
    return accumulator;
  }, {})
);

export const selectFilteredTransactions = createSelector(
  [selectTransactions, selectTransactionFilter, selectCategoriesMap],
  (transactions, filter, categoriesMap) =>
    transactions.filter((transaction) => {
      if (filter.type !== "ALL" && transaction.type !== filter.type) {
        return false;
      }

      if (filter.categoryId !== "ALL" && transaction.categoryId !== filter.categoryId) {
        return false;
      }

      if (
        filter.search &&
        !transaction.comment.toLowerCase().includes(filter.search.toLowerCase()) &&
        !categoriesMap[transaction.categoryId]?.name
          ?.toLowerCase()
          .includes(filter.search.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
);
