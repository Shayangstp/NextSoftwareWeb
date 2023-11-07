import { configureStore } from "@reduxjs/toolkit";
import signupSlices from "@/Slices/signupSlices";
import mainSlices from "@/Slices/mainSlices";
import loginSlices from "@/Slices/loginSlices";
import ticketSlices from "@/Slices/ticketSlices";

const rootReducer = {
  signup: signupSlices,
  main: mainSlices,
  login: loginSlices,
  ticket: ticketSlices,
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
