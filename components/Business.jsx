import React, { useContext } from "react";
import styles, { layout } from "../styles/style";
import Button from "./Button";
import { useTranslations } from "next-intl";
import { StateContext } from "@/store/contextProvider";

const Business = () => {
  const { isDarkMode } = useContext(StateContext);

  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  return (
    <section
      dir={enIsOn ? "rtl" : "ltr"}
      id="features"
      className={`xl:w-[1280px] ${layout.sectionReverse} xl:mr-auto xl:ml-auto  mb-[200px] dark:bg-light`}
    >
      <div
        dir={!enIsOn ? "rtl" : "ltr"}
        className={`${layout.sectionImgStart} flex-col mr-3 rtl:ml-5 `}
      >
        <div
          dir={!enIsOn ? "rtl" : "ltr"}
          className={`flex flex-row p-6 rounded-2xl mb-3 ${
            !enIsOn
              ? `border-r-2 border-cyan-100 shadow-businessShadow shadow-teal-200 dark:shadow-businessShadowDark dark:border-gray-700 dark:shadow-black ${
                  isDarkMode ? "feature-card" : "feature-card-light"
                }`
              : `border-l-2 border-cyan-100 shadow-businessShadowEn shadow-teal-200 dark:shadow-businessShadowDark dark:border-gray-700 dark:shadow-black ${
                  isDarkMode ? "feature-card" : "feature-card-light"
                }`
          }`}
        >
          <div
            className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue dark:bg-gray-700 ml-5`}
          >
            <img
              src="./star.svg"
              alt="star"
              className="w-[50%] h-[50%] object-contain"
            />
          </div>
          <div className="flex-1 flex flex-col ml-3">
            <h4
              className={`font-semibold text-white dark:text-black text-[18px] leading-[23.4px] mb-3 ${
                enIsOn ? "fontPoppins leading-5" : ""
              }`}
            >
              {t("Btitle1")}
            </h4>
            <p
              className={`font-normal text-dimWhite text-[16px] leading-[30px] dark:text-black ${
                enIsOn ? "fontPoppins leading-7" : ""
              }`}
            >
              {t("Bcontent1")}
            </p>
          </div>
        </div>

        <div
          className={`flex flex-row p-6 rounded-2xl mb-3 ${
            !enIsOn
              ? `border-r-2 border-cyan-100 shadow-businessShadow shadow-teal-200 dark:shadow-businessShadowDark dark:border-gray-700 dark:shadow-black ${
                  isDarkMode ? "feature-card" : "feature-card-light"
                }`
              : `border-l-2 border-cyan-100 shadow-businessShadowEn shadow-teal-200 dark:shadow-businessShadowDark dark:border-gray-700 dark:shadow-black ${
                  isDarkMode ? "feature-card" : "feature-card-light"
                }`
          }`}
        >
          <div
            className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue dark:bg-gray-700 ml-5`}
          >
            <img
              src="./shield.svg"
              alt="star"
              className="w-[50%] h-[50%] object-contain"
            />
          </div>
          <div className="flex-1 flex flex-col ml-3">
            <h4
              className={`font-semibold text-white dark:text-black text-[18px] leading-[23.4px] mb-3 ${
                enIsOn ? "fontPoppins leading-5" : ""
              }`}
            >
              {t("Btitle2")}
            </h4>
            <p
              className={`font-normal text-dimWhite text-[16px] leading-[30px] dark:text-black ${
                enIsOn ? "fontPoppins leading-7" : ""
              }`}
            >
              {t("Bcontent2")}
            </p>
          </div>
        </div>

        <div
          className={`flex flex-row p-6 rounded-2xl   ${
            !enIsOn
              ? `border-r-2 border-cyan-100 shadow-businessShadow shadow-teal-200 dark:shadow-businessShadowDark dark:border-gray-700 dark:shadow-black ${
                  isDarkMode ? "feature-card" : "feature-card-light"
                }`
              : `border-l-2 border-cyan-100 shadow-businessShadowEn shadow-teal-200 dark:shadow-businessShadowDark dark:border-gray-700 dark:shadow-black ${
                  isDarkMode ? "feature-card" : "feature-card-light"
                }`
          }`}
        >
          <div
            className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue dark:bg-gray-700 ml-5`}
          >
            <img
              src="./send.svg"
              alt="star"
              className="w-[50%] h-[50%] object-contain"
            />
          </div>
          <div className="flex-1 flex flex-col ml-3">
            <h4
              className={`font-semibold text-white dark:text-black text-[18px] leading-[23.4px] mb-3 ${
                enIsOn ? "fontPoppins leading-5" : ""
              }`}
            >
              {t("Btitle3")}
            </h4>
            <p
              className={`font-normal text-dimWhite text-[16px] leading-[30px] dark:text-black ${
                enIsOn ? "fontPoppins leading-7" : ""
              }`}
            >
              {t("Bcontent3")}
            </p>
          </div>
        </div>
      </div>
      <div
        dir={!enIsOn ? "rtl" : "ltr"}
        className={`${layout.sectionInfoCenter} mb-5 rtl:ml-2 ltr:ml-4`}
      >
        <h2
          className={`${
            styles.heading2
          } md:text-[40px] text-[30px] mb-3 dark:text-black  ${
            enIsOn ? "fontPoppins" : ""
          }`}
        >
          {t("Buisiness1")}, <br className="sm:block hidden " />{" "}
          {t("Buisiness2")}
        </h2>
        <p
          className={`${styles.paragraph}  ${
            enIsOn ? "fontPoppins" : ""
          }  w-full mt-10 mb-5 text-gray-300 dark:text-black dark:font-semibold leading-[23px]`}
        >
          {t("BuisinessSub")}
        </p>
        <div className="flex">
          <Button
            title={t("Bbutton")}
            icon={false}
            styles={`mt-10 text-cyan-200 dark:text-black transition active:scale-95 dark:hover:bg-gradient-to-r mb-10 md:mb-0 ltr:mr-2 rtl:ml-2 hover:bg-gray-900 dark:hover:bg-gray-200 sm:py-4 sm:px-8 rounded-2xl`}
          />
          <Button
            title="Demo"
            icon={true}
            styles={`mt-10 text-white dark:text-black  flex flex-row-reverse border-none transition active:scale-95 bg-gradient-to-r from-cyan-400 to-gray-900 hover:to-gray-800 dark:bg-gradient-to-r dark:from-cyan-300 dark:to-gray-100 hover:to-gray-800 dark:hover:to-gray-200 mb-10 md:mb-0 rounded sm:py-4 sm:px-8 rounded-2xl`}
          />
        </div>
      </div>
    </section>
  );
};

export default Business;
