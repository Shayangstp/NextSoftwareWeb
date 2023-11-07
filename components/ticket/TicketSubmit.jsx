import React from "react";
import TicketForm from "./TicketForm";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "@/Slices/mainSlices";

const TicketSubmit = () => {
  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  const userInfo = useSelector(selectUserInfo);

  return (
    <div className="p-8 dark:border rounded-xl dark:bg-white bg-gray-900 shadow">
      <p
        className={`text-white text-[28px] dark:text-black dark:font-semibold ${
          enIsOn ? "fontPoppins" : ""
        }`}
      >
        {t("SubTicketTitle")}
      </p>
      <p
        className={`text-gray-400 dark:text-gray-500 mt-3 rtl:text-[12px] rtl:leading-6 ${
          enIsOn ? "fontPoppins" : ""
        }`}
      >
        {t("SubTicketSub")}
      </p>
      <div class="flex items-center text-white mt-10 mb-10">
        <img
          className="w-10 h-10 rounded-full ltr:mr-2 rtl:ml-2  text-white"
          src="/profile.png"
          alt="avatar"
        />
        <div className="text-sm">
          <p
            className={`leading-none text-white dark:text-black dark:font-semibold  ${
              enIsOn ? "fontPoppins" : ""
            }`}
          >
            {userInfo.fullname}
          </p>
          <p className="text-gray-400 dark:text-gray-500  fontPoppins mt-2">
            {userInfo.email}
          </p>
        </div>
      </div>
      <TicketForm />
    </div>
  );
};

export default TicketSubmit;
