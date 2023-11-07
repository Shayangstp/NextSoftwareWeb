import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginEmail: "",
  loginPassword: "",
  loginRememberMe: false,
  loginGoogle: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    RsetLoginEmail: (state, { payload }) => {
      return { ...state, loginEmail: payload };
    },
    RsetLoginPassword: (state, { payload }) => {
      return {
        ...state,
        loginPassword: payload,
      };
    },
    RsetLoginRemeberMe: (state, { payload }) => {
      return {
        ...state,
        loginRememberMe: payload,
      };
    },
    RsetLoginGoogle: (state, { payload }) => {
      return {
        ...state,
        loginGoogle: payload,
      };
    },
  },
});

export const {
  RsetLoginEmail,
  RsetLoginPassword,
  RsetLoginRemeberMe,
  RsetLoginGoogle,
} = loginSlice.actions;

export const selectLoginEmail = (state) => state.login.loginEmail;
export const selectLoginPassword = (state) => state.login.loginPassword;
export const selectLoginRemeberMe = (state) => state.login.loginRemeberMe;
export const selectLoginGoogle = (state) => state.login.loginGoogle;

export default loginSlice.reducer;
