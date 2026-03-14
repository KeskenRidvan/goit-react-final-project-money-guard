import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, clearAuthHeader, getErrorMessage, setAuthHeader } from "../api";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/api/auth/sign-up", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Registration failed.")
      );
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await api.post("/api/auth/sign-in", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Login failed."));
    }
  }
);

export const signOut = createAsyncThunk("auth/signOut", async (_, thunkAPI) => {
  try {
    await api.delete("/api/auth/sign-out");
    clearAuthHeader();
    return true;
  } catch (error) {
    clearAuthHeader();
    return thunkAPI.rejectWithValue(
      getErrorMessage(error, "Session could not be closed on the server.")
    );
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("Missing token.");
    }

    try {
      setAuthHeader(token);
      const { data } = await api.get("/api/users/current");
      return data;
    } catch (error) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Could not restore the session.")
      );
    }
  }
);
