import { MONTH_OPTIONS, TRANSACTION_TYPE } from "./constants";

export const formatCurrency = (value, options = {}) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(options.absolute ? Math.abs(Number(value ?? 0)) : Number(value ?? 0));

export const formatDateLabel = (value) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

export const formatShortDate = (value) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  })
    .format(new Date(value))
    .replaceAll("/", ".");

export const getMonthLabel = (month) =>
  MONTH_OPTIONS.find((item) => item.value === Number(month))?.label ?? "";

export const getTransactionTypeLabel = (type) =>
  type === TRANSACTION_TYPE.INCOME ? "Income" : "Expense";

export const getTransactionSign = (type) =>
  type === TRANSACTION_TYPE.INCOME ? "+" : "-";
