import styles, { layout } from "../styles/style";
import { useTranslations } from "next-intl";

const IntoduceVideo = () => {
  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  return (
    <section
      dir={enIsOn ? "rtl" : "ltr"}
      id="product"
      className={`xl:w-[1280px] xl:mr-auto xl:ml-auto ${layout.section} mb-[200px]`}
    >
      <div className={`${layout.sectionImgReverse} mb-10 md:mb-0`}>
        <div>
          <video
            className=" border-2 border-black mt-10  dark:border-black rounded-3xl w-[450px] h-[250px] sm:w-[500px] sm:h-[300px] bg-black mb-10 shadow-videoShadow shadow-teal-200 dark:shadow-md dark:shadow-black"
            src="./test.mp4"
            controls
          ></video>
        </div>

        {/* gradient start */}
        <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
        <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
        {/* gradient end */}
      </div>
      <div
        dir={!enIsOn ? "rtl" : "ltr"}
        className={`${layout.sectionInfo} md:mr-10 md:mt-5 mt-5 rtl:ml-10`}
      >
        <h2
          className={`${
            styles.heading2
          } md:text-[40px]  text-[30px] dark:text-black ${
            enIsOn ? "fontPoppins" : ""
          }`}
        >
          {t("VideoTitle1")} <br className="sm:block hidden" />{" "}
          {t("VideoTitle2")}
        </h2>
        <p
          className={`${
            styles.paragraph
          } max-w-[470px] mt-5 text-gray-400 dark:text-black dark:font-semibold leading-[23px]${
            enIsOn ? "fontPoppins leading-5" : ""
          }`}
        >
          {t("VideoSub")}
        </p>
      </div>
    </section>
  );
};

export default IntoduceVideo;
