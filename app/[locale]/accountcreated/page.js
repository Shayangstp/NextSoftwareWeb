"use client";
import React, { useState, useContext } from "react";
import Navbar from "@/components/Navbar";
import styles from "@/styles/style";
import { StateContext } from "@/store/contextProvider";
import AccountCreated from "@/components/AccountCreated";

const page = () => {
  const { isDarkMode, toggleDarkMode } = useContext(StateContext);

  const htmlClasses = !isDarkMode ? "dark" : "";

  return (
    <div className={htmlClasses}>
      <div className="w-full bg-primary dark:bg-light  overflow-hidden ml-auto mr-auto h-[100%]">
        <div
          className={`${styles.paddingX} ${styles.flexCenter} ${styles.boxWidth} mr-5`}
        >
          <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        </div>
        <div className={`bg-primary dark:bg-light `}>
          <AccountCreated isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default page;
