"use client";
import React, { useState, useContext } from "react";

import Navbar from "@/components/Navbar";
import styles from "@/styles/style";
import Support from "@/components/ticket/Support";
import TicketConver from "@/components/ticket/TicketConver";

import { StateContext } from "@/store/contextProvider";

const page = () => {
  const { isDarkMode, toggleDarkMode } = useContext(StateContext);

  const htmlClasses = !isDarkMode ? "dark" : "";

  return (
    <div className={htmlClasses}>
      <div className="bg-primary dark:bg-light ml-auto mr-auto h-screen">
        <div
          className={`${styles.paddingX} ${styles.flexCenter} ${styles.boxWidth} mr-5`}
        >
          <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        </div>
        <div className={`bg-primary dark:bg-light`}>
          <Support isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default page;
