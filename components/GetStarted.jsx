"use client";
import React from "react";
import styles from "../styles/style";

const GetStarted = () => (
  <div
    className={`${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-secondary dark:bg-[#5ed4d8] hover:bg-cyan-900 dark:hover:bg-cyan-600 p-[2px] cursor-pointer shadow-lg  shadow-cyan-400 transition duration-50 ease-in-out `}
  >
    <div
      className={`${styles.flexCenter} flex-col bg-[#0a0a0a] dark:bg-[#d9d9d9] dark:hover:bg-gradient-to-b from-[#ebebeb] via-[#87cee4] to-[#ffffff] w-[100%] h-[100%] rounded-full transition duration-50 ease-in-out`}
    >
      <div className={`${styles.flexStart} flex-row`}>
        <p className="font-medium text-[18px] leading-[23.4px]">
          <span className="text-cyan-300 dark:text-black dark:font-semibold">
            دانلود
          </span>
        </p>
      </div>

      <p className="font-medium text-[18px] leading-[23.4px]">
        <span className="text-cyan-200 dark:text-black dark:font-semibold">
          Demo
        </span>
      </p>
    </div>
  </div>
);

export default GetStarted;
