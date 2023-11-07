"use client";
import React from "react";
import { layout } from "@/styles/style";
import Map from "@/components/Map";
import ContactForm from "./ContactForm";
import {
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";

const ContactPage = ({ isDarkMode }) => {
  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  const contact = [
    {
      title: t("ContactAddressTitle"),
      detail: t("ContactAddressSub"),
    },
    {
      title: t("ContactTelephoneTitle"),
      detail: t("ContactTelephoneSub"),
    },
    {
      title: t("ContactEmailTitle"),
      detail: t("ContactEmailSub"),
    },
    {
      title: t("ContactPostTitle"),
      detail: t("ContactPostSub"),
    },
  ];

  return (
    <section
      id="features"
      className={`xl:w-[1200px] md:w-[900px] lg:w-[1100px] h-[100vh] ml-auto mr-auto lg:${layout.section} ${layout.sectionReverse} justify-center  mb-[100px] `}
    >
      <div className="flex flex-col-reverse md:flex-row bg-gray-900 px-6 py-3 dark:bg-white m-auto mt-10 md:w-[1000px]  w-[400px] sm:w-[500px] rounded-xl">
        <div className="sm:w-[450px] md:w-[600px] h-[350px] mt-5 md:mt-0">
          <Map />
        </div>
        <div
          dir={!enIsOn ? "rtl" : "ltr"}
          className="md:w-[500px] w-[100%] md:mr-6 mt-[25px] ml-4"
        >
          {contact.map((item) => {
            return (
              <div className="flex flex-col mr-6 md:mr-5">
                <p
                  className={`text-white dark:text-black dark:font-bold mb-2 text-[12px] ${
                    enIsOn ? "fontPoppins leading-5" : ""
                  }`}
                >
                  {item.title}
                  <span
                    className={`mr-2 text-gray-300 text-[12px] dark:text-gray-700 dark:font-semibold mb-2 ${
                      enIsOn ? "fontPoppins leading-5" : ""
                    }`}
                  >
                    {item.detail}
                  </span>
                </p>
              </div>
            );
          })}
          <div className="flex flex-row md:mt-0  text-white dark:text-black text-[25px] mr-5">
            <button className="mr-2 hover:text-cyan-500 text-[18px]  ">
              <FontAwesomeIcon icon={faInstagram} />
            </button>
            <button className="mr-2 hover:text-cyan-500 text-[18px]">
              <FontAwesomeIcon icon={faLinkedinIn} />
            </button>
            <button className="mr-2 hover:text-cyan-500 text-[18px]">
              <FontAwesomeIcon icon={faWhatsapp} />
            </button>

            <button className="mr-2 hover:text-cyan-500 text-[18px]">
              <FontAwesomeIcon icon={faTelegram} />
            </button>
          </div>
        </div>
        <div dir={enIsOn ? "rtl" : "ltr"} className={`flex flex-col`}>
          <ContactForm />
        </div>
      </div>

      {/* gradient start */}
      <div className="absolute z-[0] w-[15%] h-[15%]  left-20  pink__gradient" />
      <div className="absolute z-[0] w-[20%] h-[20%]  left-20  blue__gradient" />
      {/* gradient end */}
    </section>
  );
};

export default ContactPage;
