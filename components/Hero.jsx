"use client";
import React, { useContext } from "react";
import styles from "../styles/style";
import { useTranslations } from "next-intl";
import { StateContext } from "@/store/contextProvider";
import { RsetIsDarkMode, selectIsDarkMode } from "@/Slices/mainSlices";
import { useSelector, useDispatch } from "react-redux";

const Hero = () => {
  const isDarkMode = useSelector(selectIsDarkMode);

  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  return (
    <section
      dir={enIsOn ? "rtl" : "ltr"}
      id="home"
      className={`xl:w-[1280px] flex lg:flex-row flex-col-reverse dark:bg-[#FEFCF3]  w-full xl:p-8 `}
    >
      <div
        className={`flex ${styles.flexStart} md:w-[1100px] md:h-[400px]  md:my-0 my-10  lg:ltr:mr-[150px] lg:rtl:ml-[100px] relative`}
      >
        <img
          src="./software1.png"
          alt="billing"
          className="w-[100%] h-[100%] relative z-[5] object-cover"
        />
        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

      <div
        dir={enIsOn ? "rtl" : "ltr"}
        className={`sm:${styles.flexEnd} rtl:justify-start flex-col xl:px-0 sm:px-10 px-6 rtl:ml-10 ltr:mr-10 relative`}
      >
        {/* heroText */}
        <div className="flex flex-row rtl:justify-end ltr:justify-end items-center w-full ">
          <h1
            dir={enIsOn ? "ltr" : "rtl"}
            className="w-[500px] font-semibold sm:text-[65px] text-[32px] text-white dark:text-black ss:leading-[100.8px] leading-[75px]  rtl:ml-[40px] "
          >
            <span className="mr-[60px] ">{t("heroText1")}</span>
            <br className="block" />{" "}
            <span
              className={`text-cyan-300 ${
                isDarkMode ? "text-gradient" : "text-gradient2"
              }  ltr:mr-[40px] rtl:ml-[15px]`}
            >
              {t("heroText2")}
            </span>{" "}
            <br className="block" />
            <span className="ltr:mr-[10px] rtl:ml-[25px]">
              {t("heroText3")}
            </span>
          </h1>
        </div>
        <p
          dir={enIsOn ? "ltr" : "rtl"}
          className={`${
            styles.paragraph
          } mr-[10px] text-[12px] max-w-[570px] mt-5 text-gray-400 dark:text-black dark:font-semibold leading-[23px] rtl:ml-[40px] ${
            enIsOn ? "fontPoppins leading-5" : ""
          }`}
        >
          {t("heroSubText")}
        </p>
      </div>
    </section>
  );
};

export default Hero;
