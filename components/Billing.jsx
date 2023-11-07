import React from "react";
import styles, { layout } from "../styles/style";
import { useTranslations } from "next-intl";

const Billing = () => {
  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  return (
    <section
      dir={enIsOn ? "rtl" : "ltr"}
      id="product"
      className={`xl:w-[1280px] m-auto ${layout.sectionReverse} mb-[200px] `}
    >
      <div
        dir={!enIsOn ? "rtl" : "ltr"}
        className={`${layout.sectionInfo} md:mr-10 md:mt-5 mt-5 rtl:ml-10 `}
      >
        <h2
          className={`${
            styles.heading2
          } md:text-[40px]  text-[30px] dark:text-black ${
            enIsOn ? "fontPoppins" : ""
          }`}
        >
          {t("Billtitle1")} <br className="sm:block hidden" /> {t("Billtitle2")}
        </h2>
        <p
          className={`${
            styles.paragraph
          } max-w-[470px] mt-5 text-gray-400 dark:text-black dark:font-semibold leading-[23px] ${
            enIsOn ? "fontPoppins leading-5" : ""
          }`}
        >
          {t("BillSub")}
        </p>

        <div className="flex flex-row flex-wrap sm:mt-10 mt-6 w-full justify-center">
          <img
            src="./apple.svg"
            alt="google_play"
            className="w-[128.86px] h-[42.05px] object-contain mr-5 cursor-pointer"
          />
          <img
            src="./google.svg"
            alt="google_play"
            className="w-[144.17px] h-[43.08px] object-contain cursor-pointer"
          />
        </div>
      </div>
      <div className={`${layout.sectionImgReverse} mb-10 md:mb-0 rtl:ml-10`}>
        <div>
          <img
            src="./gif.gif"
            className="rounded-2xl border-2 border-dotted border-cyan-400 dark:border-black"
            alt="My GIF"
          />
        </div>

        {/* gradient start */}
        <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
        <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
        {/* gradient end */}
      </div>
    </section>
  );
};

export default Billing;
