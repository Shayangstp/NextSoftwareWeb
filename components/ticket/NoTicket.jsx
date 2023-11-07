import React, { useContext } from "react";
import {
  faArrowRightLong,
  faArrowLeftLong,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StateContext } from "@/store/contextProvider";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const NoTicket = () => {
  const { ticket, showSubmitHandler, ticketBtnHandler } =
    useContext(StateContext);

  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  return (
    <div className="p-7 lg:w-[700px] lg:h-[180px] bg-gray-900 rounded-lg dark:bg-white dark:border shadow mt-5 lg:mt-0">
      <p
        className={`font-bold text-[15px] sm:text-[18px] text-white dark:text-black ${
          enIsOn ? "fontPoppins" : ""
        }`}
      >
        {t("NoTicketTitle")}
      </p>
      <p
        className={`mt-2 rtl:mt-4 text-[12px] sm:text-[15px] rtl:text-[12px] text-gray-400 dark:text-gray-500 ${
          enIsOn ? "fontPoppins" : ""
        }`}
      >
        {t("NoTicketSub")}
      </p>
      <button
        onClick={() => {
          showSubmitHandler();
          ticketBtnHandler();
        }}
        className={` font-bold text-cyan-600 hover:text-cyan-400 mt-5 text-[12px] sm:text-[14px] ${
          enIsOn ? "fontPoppins" : ""
        }`}
      >
        {t("TicketButton1")}
        <span className="rtl:mr-2 ml-2">
          {enIsOn ? (
            <FontAwesomeIcon icon={faArrowRightLong} />
          ) : (
            <FontAwesomeIcon icon={faArrowLeftLong} />
          )}
        </span>
      </button>
    </div>
  );
};

export default NoTicket;
