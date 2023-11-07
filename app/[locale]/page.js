"use client";
import React, { useContext } from "react";
import { StateContext } from "@/store/contextProvider";

import styles from "@/styles/style";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Business from "@/components/Business";
import Billing from "@/components/Billing";
import IntroduceVideo from "@/components/IntroduceVideo";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { layout } from "@/styles/style";
import { RsetIsDarkMode, selectIsDarkMode } from "@/Slices/mainSlices";
import { useSelector, useDispatch } from "react-redux";

const page = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);
  // const { isDarkMode, toggleDarkMode } = useContext(StateContext);
  const { toggleDarkMode } = useContext(StateContext);

  const htmlClasses = !isDarkMode ? "dark" : "";

  return (
    <div className={htmlClasses}>
      <div className="bg-primary dark:bg-light w-full overflow-hidden">
        <div
          className={`${styles.paddingX}  ${styles.flexCenter} ${styles.boxWidth} mr-5`}
        >
          <Navbar toggleDarkMode={toggleDarkMode} />
        </div>

        <div
          className={`bg-primary dark:bg-light  ${styles.flexStart} ${styles.boxWidth} mb-[10px] lg:mb-[100px]`}
        >
          <Hero />
        </div>

        <div
          className={`bg-primary dark:bg-light ${styles.paddingX} ${styles.flexCenter}`}
        >
          <div className={`${styles.boxWidth}`}>
            <Stats />
            <Business isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <Billing />
            <IntroduceVideo />
            {/* <Testimonials /> */}
            {/* <Clients /> */}
            <CTA isDarkMode={isDarkMode} />
            <Footer isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
