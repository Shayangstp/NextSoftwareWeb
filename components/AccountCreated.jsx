import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";

const AccountCreated = () => {
  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  return (
    <section
      dir={!enIsOn ? "rtl" : "ltr"}
      id="features"
      className="flex justify-center mt-10 h-[100vh] ml-10 mr-10 sm:ml-0 sm:mr-0"
    >
      <div className="rounded-lg mt-10 sm:max-w-lg xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 dark:border-none rounded-xl  bg-gray-900 dark:bg-white shadow-md">
          <h1 className="text-cyan-500 dark:text-black text-center text-[24px]">
            {t("AccountCreatedTitle")}
          </h1>
          <div className="flex flex-col justify-center items-center">
            <p className="text-white dark:text-black dark:font-semibold text-[13px] text-center">
              {t("AccountCreatedSub")}
            </p>
            <Link
              href="/login"
              className="text-white bg-cyan-600 px-6 py-1.5 hover:bg-cyan-500 w-[200px] text-center mt-5 rounded  "
            >
              {t("AccountCreatedLogin")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountCreated;
