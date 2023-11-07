import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: true,
  formErrors: "",
  userInfo: "",
  loading: false,
  userTickets: {},
  openTickets: "",
  closeTickets: "",
  clientTicketMessages: {},
  ticketIdReload: "",
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    RsetIsDarkMode: (state, { payload }) => {
      return { ...state, isDarkMode: payload };
    },
    RsetFormErrors: (state, { payload }) => {
      return { ...state, formErrors: payload };
    },
    RsetUserInfo: (state, { payload }) => {
      return { ...state, userInfo: payload };
    },
    RsetLoading: (state, { payload }) => {
      return { ...state, loading: payload };
    },
    RsetUserTickets: (state, { payload }) => {
      return { ...state, userTickets: payload };
    },
    RsetOpenTickets: (state, { payload }) => {
      return { ...state, openTickets: payload };
    },
    RsetCloseTickets: (state, { payload }) => {
      return { ...state, closeTickets: payload };
    },
    RsetClientTicketMessages: (state, { payload }) => {
      return { ...state, clientTicketMessages: payload };
    },
    RsetTicketIdReload: (state, { payload }) => {
      return { ...state, ticketIdReload: payload };
    },
  },
});

export const {
  RsetIsDarkMode,
  RsetFormErrors,
  RsetUserInfo,
  RsetLoading,
  RsetUserTickets,
  RsetOpenTickets,
  RsetCloseTickets,
  RsetClientTicketMessages,
  RsetTicketIdReload,
} = mainSlice.actions;

export const selectIsDarkMode = (state) => state.main.isDarkMode;
export const selectFormErrors = (state) => state.main.formErrors;
export const selectUserInfo = (state) => state.main.userInfo;
export const selectLoading = (state) => state.main.loading;
export const selectUserTickets = (state) => state.main.userTickets;
export const selectOpenTickets = (state) => state.main.openTickets;
export const selectCloseTickets = (state) => state.main.closeTickets;
export const selectClientTicketMessages = (state) =>
  state.main.clientTicketMessages;
export const selectTicketIdReload = (state) => state.main.ticketIdReload;

export default mainSlice.reducer;
