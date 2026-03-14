export const APP_NAME = "Money Guard";
export const CURRENCY_CACHE_KEY = "money-guard-currency-cache";
export const ONE_HOUR_IN_MS = 60 * 60 * 1000;

export const TRANSACTION_TYPE = {
  INCOME: "INCOME",
  EXPENSE: "EXPENSE",
};

export const TRANSACTION_TYPE_OPTIONS = [
  { value: TRANSACTION_TYPE.EXPENSE, label: "Expense" },
  { value: TRANSACTION_TYPE.INCOME, label: "Income" },
];

export const MONTH_OPTIONS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export const getYearOptions = () => {
  const currentYear = new Date().getFullYear();

  return Array.from({ length: 6 }, (_, index) => currentYear - index);
};
