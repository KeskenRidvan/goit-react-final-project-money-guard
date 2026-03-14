import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api, getErrorMessage } from "../api";
import {
  CURRENCY_CACHE_KEY,
  ONE_HOUR_IN_MS,
  TRANSACTION_TYPE,
} from "../../utils/constants";

const parseCurrencyCode = (code) => {
  if (code === 840) {
    return "USD";
  }

  if (code === 978) {
    return "EUR";
  }

  return "UAH";
};

export const fetchTransactionCategories = createAsyncThunk(
  "finance/fetchTransactionCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/api/transaction-categories");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Could not load categories.")
      );
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  "finance/fetchTransactions",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/api/transactions");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Could not load transactions.")
      );
    }
  }
);

export const addTransaction = createAsyncThunk(
  "finance/addTransaction",
  async (payload, thunkAPI) => {
    try {
      const { data } = await api.post("/api/transactions", payload);
      await thunkAPI.dispatch(fetchTransactions()).unwrap();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Could not add the transaction.")
      );
    }
  }
);

export const updateTransaction = createAsyncThunk(
  "finance/updateTransaction",
  async ({ transactionId, values }, thunkAPI) => {
    try {
      const { data } = await api.patch(`/api/transactions/${transactionId}`, values);
      await thunkAPI.dispatch(fetchTransactions()).unwrap();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Could not update the transaction.")
      );
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "finance/deleteTransaction",
  async (transactionId, thunkAPI) => {
    try {
      await api.delete(`/api/transactions/${transactionId}`);
      await thunkAPI.dispatch(fetchTransactions()).unwrap();
      return transactionId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Could not delete the transaction.")
      );
    }
  }
);

export const fetchTransactionsSummary = createAsyncThunk(
  "finance/fetchTransactionsSummary",
  async ({ month, year }, thunkAPI) => {
    try {
      const { data } = await api.get("/api/transactions-summary", {
        params: { month, year },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Could not load statistics.")
      );
    }
  }
);

export const fetchCurrencyRates = createAsyncThunk(
  "finance/fetchCurrencyRates",
  async (_, thunkAPI) => {
    const now = Date.now();

    try {
      const cachedValue = localStorage.getItem(CURRENCY_CACHE_KEY);

      if (cachedValue) {
        const parsed = JSON.parse(cachedValue);

        if (now - parsed.fetchedAt < ONE_HOUR_IN_MS) {
          return parsed;
        }
      }

      const monobankUrl =
        import.meta.env.VITE_MONOBANK_API_URL ??
        "https://api.monobank.ua/bank/currency";

      const { data } = await axios.get(monobankUrl);
      const rates = data
        .filter(
          (item) =>
            item.currencyCodeB === 980 &&
            [840, 978].includes(item.currencyCodeA)
        )
        .map((item) => ({
          code: parseCurrencyCode(item.currencyCodeA),
          buy: item.rateBuy ?? item.rateCross ?? 0,
          sell: item.rateSell ?? item.rateCross ?? 0,
        }));

      const payload = {
        rates,
        fetchedAt: now,
      };

      localStorage.setItem(CURRENCY_CACHE_KEY, JSON.stringify(payload));

      return payload;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Could not load currency rates.")
      );
    }
  }
);

export const getDefaultCategoryId = (categories, type) => {
  const match = categories.find((item) => item.type === type);

  return match?.id ?? "";
};

export const buildTransactionPayload = ({
  amount,
  categoryId,
  comment,
  transactionDate,
  type,
}) => {
  const normalizedType = type ?? TRANSACTION_TYPE.EXPENSE;
  const normalizedAmount = Math.abs(Number(amount));

  return {
    amount:
      normalizedType === TRANSACTION_TYPE.EXPENSE
        ? -normalizedAmount
        : normalizedAmount,
    categoryId,
    comment,
    transactionDate:
      transactionDate instanceof Date
        ? transactionDate.toISOString()
        : new Date(transactionDate).toISOString(),
    type: normalizedType,
  };
};
