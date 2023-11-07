import styles from "../styles/style";
import Button from "./Button";
import { useTranslations } from "next-intl";

const CTA = ({ isDarkMode }) => {
  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  return (
    <section
      dir={enIsOn ? "rtl" : "ltr"}
      className={`xl:w-[1280px] xl:mr-auto xl:ml-auto ${styles.flexCenter} ${
        styles.padding
      } sm:flex-row flex-col-reverse  ${
        !isDarkMode ? "bg-light-gradient-2" : "bg-black-gradient-2"
      } h-[250px] sm:h-[200] rounded-[20px] box-shadow mb-[100px]`}
    >
      <div
        className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mb-2 sm:mb-0`}
      >
        <Button
          title="Demo"
          icon={true}
          styles="  text-white dark:text-black rounded  border-2 rounded-2xl hover:bg-gradient-to-r hover:from-gray-500 hover:to-cyan-500  transition active:scale-95 dark:hover:bg-gradient-to-r dark:hover:from-gray-100 dark:hover:to-cyan-500 sm:py-4 sm:px-10 ms-10"
        />
      </div>

      <div dir={!enIsOn ? "rtl" : "ltr"} className="flex-1 flex flex-col ml-2">
        <h2
          className={`${
            styles.heading2
          } text-[20px] lg:text-[40px] mt-5 sm:mt-0 dark:text-black ${
            enIsOn ? "fontPoppins" : ""
          }`}
        >
          {t("Ctitle")}
        </h2>
        <p
          className={`${
            styles.paragraph
          } max-w-[470px] mt-5 text-gray-300 dark:text-black dark:font-semibold mb-3 sm:mb-0 leading-[22px] ${
            enIsOn ? "fontPoppins" : ""
          }`}
        >
          {t("Csub")}
        </p>
      </div>
    </section>
  );
};

export default CTA;
