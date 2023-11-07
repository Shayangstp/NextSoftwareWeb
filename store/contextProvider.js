"use client";
import React, { createContext, useState } from "react";

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [ticketBtn, setTicketBtn] = useState(false);
  const [showConver, setShowConver] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [ticketActive, setTicketActive] = useState({
    open: "open",
    close: "",
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const ticketBtnHandler = () => {
    setTicketBtn(!ticketBtn);
  };

  const showConverHandler = () => {
    setShowConver(!showConver);
  };

  const showSubmitHandler = () => {
    setShowSubmit(!showSubmit);
  };

  const openHandler = () => {
    setTicketActive({
      open: "open",
      close: "",
    });
  };
  const closeHandler = () => {
    setTicketActive({
      open: "",
      close: "close",
    });
  };

  return (
    <StateContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        ticketBtn,
        ticketBtnHandler,
        showConver,
        showConverHandler,
        setTicketActive,
        ticketActive,
        showSubmitHandler,
        showSubmit,
        openHandler,
        closeHandler,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
