"use client";
import React, { useContext } from "react";
import Navbar from "@/components/Navbar";
import styles from "@/styles/style";
import ContactPage from "@/components/ContactPage";
import { StateContext } from "@/store/contextProvider";

const page = () => {
  const { isDarkMode, toggleDarkMode } = useContext(StateContext);

  const htmlClasses = !isDarkMode ? "dark" : "";

  return (
    <div className={htmlClasses}>
      <div className="w-full h-[100%] bg-primary dark:bg-light  overflow-hidden ml-auto mr-auto">
        <div
          className={`${styles.paddingX} ${styles.flexCenter} ${styles.boxWidth} mr-5`}
        >
          <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
        </div>
        <div className={`bg-primary dark:bg-light`}>
          <ContactPage isDarkMode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default page;
