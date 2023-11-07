import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticketObj: {},
  ticketSubject: "",
  ticketMessage: "",
  ticketAddMessage: "",
  ticketId : ""
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    RsetTicketObj: (state, { payload }) => {
      return { ...state, ticketObj: payload };
    },
    RsetTicketSubject: (state, { payload }) => {
      return { ...state, ticketSubject: payload };
    },
    RsetTicketMessage: (state, { payload }) => {
      return { ...state, ticketMessage: payload };
    },
    RsetTicketAddMessage: (state, { payload }) => {
      return { ...state, ticketAddMessage: payload };
    },
    RsetTicketId: (state, { payload }) => {
      return { ...state, ticketId: payload };
    },
  },
});

export const {
  RsetTicketSubject,
  RsetTicketMessage,
  RsetTicketObj,
  RsetTicketAddMessage,
  RsetTicketId,
} = ticketSlice.actions;

export const selectTicketObj = (state) => state.ticket.ticketObj;
export const selectTicketSubject = (state) => state.ticket.ticketSubject;
export const selectTicketMessage = (state) => state.ticket.ticketMessage;
export const selectTicketAddMessage = (state) => state.ticket.ticketAddMessage;
export const selectTicketid = (state) => state.ticket.ticketId;

export default ticketSlice.reducer;
