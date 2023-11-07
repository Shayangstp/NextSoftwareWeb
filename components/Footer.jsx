import React, { useContext } from "react";
import styles from "../styles/style";
import {
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { StateContext } from "@/store/contextProvider";

const Footer = () => {
  const { isDarkMode } = useContext(StateContext);

  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  const footerLinks = [
    {
      title: t("Ftitle1"),
      links: [
        {
          name: t("FSub1-1"),
          link: "#",
        },
        {
          name: t("FSub1-2"),
          link: "#",
        },
        {
          name: t("FSub1-3"),
          link: "#",
        },
        {
          name: t("FSub1-4"),
          link: "#",
        },
        {
          name: t("FSub1-5"),
          link: "#",
        },
      ],
    },
    {
      title: t("Ftitle2"),
      links: [
        {
          name: t("FSub2-1"),
          link: "#",
        },
        {
          name: t("FSub2-2"),
          link: "#",
        },
        {
          name: t("FSub2-3"),
          link: "#",
        },
        {
          name: t("FSub2-4"),
          link: "#",
        },
        {
          name: t("FSub2-5"),
          link: "#",
        },
      ],
    },
    {
      title: t("Ftitle3"),
      links: [
        {
          name: t("FSub3-1"),
          link: "#",
        },
        {
          name: t("FSub3-2"),
          link: "#",
        },
      ],
    },
  ];

  return (
    <section
      className={`xl:w-[1280px] xl:mr-auto xl:ml-auto ${styles.flexCenter} ${styles.paddingY} flex-col mb-[20px]`}
    >
      <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
        <div className="flex-[1] flex flex-col justify-start mr-10">
          <img
            src={
              !isDarkMode ? "./softwareLogoDark.png" : "./softwareLogoLight.png"
            }
            alt="kavehGlass"
            className="w-[300px] h-[100px] object-cover"
          />
        </div>

        <div
          dir={!enIsOn ? "rtl" : "ltr"}
          className={`flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10`}
        >
          {footerLinks.map((footerlink) => (
            <div
              key={footerlink.title}
              className={`flex flex-col ss:my-0 my-4 min-w-[150px]`}
            >
              <h4
                className={`font-medium text-[18px] leading-[27px] text-white dark:text-black dark:font-semibold ${
                  enIsOn ? "fontPoppins leading-5" : ""
                }`}
              >
                {footerlink.title}
              </h4>
              <ul className="list-none mt-4">
                {footerlink.links.map((link, index) => (
                  <li
                    key={link.name}
                    className={`font-normal text-[13px]  theme-transition leading-[24px] text-dimWhite hover:text-secondary cursor-pointer dark:text-black dark:hover:font-semibold ${
                      index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                    } ${enIsOn ? "fontPoppins leading-5" : ""}`}
                  >
                    - {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* gradient start */}
          <div className="absolute left-80 w-[20%] h-[15%] blue__gradient" />
          {/* gradient end */}
        </div>
      </div>

      <div className="w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t-[1px] border-t-[#3F3E45]">
        <p
          className={`font-poppins font-normal text-center text-[18px] leading-[27px] text-white dark:text-black dark:font-semibold  ${
            enIsOn ? "fontPoppins leading-5" : ""
          }`}
        >
          Copyright Ⓒ 2022 EDGE TECH. All Rights Reserved.
        </p>

        <div
          className={`flex flex-row md:mt-0 mt-6 text-white dark:text-black text-[25px]`}
        >
          <button className="mr-2 hover:text-cyan-500  ">
            <FontAwesomeIcon icon={faInstagram} />
          </button>
          <button className="mr-2 hover:text-cyan-500">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </button>
          <button className="mr-2 hover:text-cyan-500">
            <FontAwesomeIcon icon={faWhatsapp} />
          </button>

          <button className="mr-2 hover:text-cyan-500">
            <FontAwesomeIcon icon={faTelegram} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Footer;
