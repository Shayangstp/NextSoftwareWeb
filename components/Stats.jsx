"use client";
import React, { useContext } from "react";
import styles from "../styles/style";
import { useTranslations } from "next-intl";
import { StateContext } from "@/store/contextProvider";


const Stats = () => {
  const { isDarkMode } = useContext(StateContext);

  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  const stats = [
    {
      id: "stats-1",
      title: t("stat1"),
      value: t("statNum1"),
    },
    {
      id: "stats-2",
      title: t("stat2"),
      value: t("statNum2"),
    },
    {
      id: "stats-3",
      title: t("stat3"),
      value: t("statNum3"),
    },
  ];

  return (
    <section
      dir={enIsOn ? "rtl" : "ltr"}
      className={`xl:w-[1280px] ${styles.flexCenter} bg-primary dark:bg-light justify-around xl:mr-auto xl:ml-auto  md:flex-row flex-col  flex-wrap sm:mb-[200px] mb-[100px] `}
    >
      {stats.map((stat) => (
        <div
          key={stat.id}
          className={`flex justify-between items-center flex-row m-3 border-b border-red-200 border-opacity-10 rounded-sm shadow-3xl shadow-rose-400 dark:shadow-3xl dark:shadow-black dark:border-b `}
        >
          <p
            className={`text-center font-normal  text-[20px] lg:leading-[26.58px] leading-[21.58px] ${
              isDarkMode ? "text-gradient" : "text-gradient2"
            } dark:text-black dark:font-semibold  mr-2 lg:mr-3 rtl:ml-2`}
          >
            {stat.title}
          </p>
          <h4 className="font-semibold lg:text-[30.89px] text-[20.89px] lg:leading-[53.16px] leading-[43.16px] text-white dark:text-black">
            {stat.value}
          </h4>
        </div>
      ))}

      {/* gradient start */}
      <div className="absolute z-[0] w-[25%] h-[25%] right-0 top-[1000px] opacity-80  rounded-full pink__gradient" />
      {/* gradient end */}
    </section>
  );
};

export default Stats;
