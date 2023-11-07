import React from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

const ContactForm = () => {
  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  const handleSubmit = (e) => {
    console.log("contact");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center"
    >
      <div
        className={`w-[300px] flex flex-col ${
          enIsOn ? "fontPoppins leading-5" : ""
        }`}
      >
        <label
          dir={!enIsOn ? "rtl" : "ltr"}
          className={` text-white text-[12px] dark:text-black mb-2 dark:font-semibold ${
            enIsOn ? "fontPoppins leading-5" : ""
          }`}
          htmlFor="name"
        >
          {t("FormFullname")}
        </label>
        <input
          dir={!enIsOn ? "rtl" : "ltr"}
          type="text"
          minLength={3}
          maxLength={150}
          required
          className=" p-2 text-[14px] bg-gray-700 dark:bg-gray-200  rounded-md  dark:border-black border-opacity-50 text-white dark:text-black focus:outline-none dark:focus:outline-none dark:shadow-sm  dark:shadow-black"
          autoComplete="off"
          id="name"
        />
      </div>
      <div className="w-[300px] flex flex-col my-4">
        <label
          dir={!enIsOn ? "rtl" : "ltr"}
          className="text-white text-[12px] dark:text-black mb-2 dark:font-semibold"
          htmlFor="email"
        >
          {t("FormEmail")}
        </label>
        <input
          dir={!enIsOn ? "rtl" : "ltr"}
          type="email"
          minLength={5}
          maxLength={150}
          required
          className="p-2 text-[14px] bg-gray-700 dark:bg-gray-200  rounded-md  dark:shadow-black border-cyan-400 dark:border-black border-opacity-50 text-white dark:text-black 
          focus:outline-none dark:focus:outline-none dark:shadow-sm"
          autoComplete="off"
          id="email"
        />
      </div>
      <div className="w-[300px] flex flex-col my-4">
        <label
          dir={!enIsOn ? "rtl" : "ltr"}
          className="text-[12px] text-white dark:text-black mb-2 dark:font-semibold"
          htmlFor="message"
        >
          {t("FormDescription")}
        </label>
        <textarea
          dir={!enIsOn ? "rtl" : "ltr"}
          rows={5}
          required
          name="message"
          className="w-full p-2 text-[14px] bg-gray-700 dark:bg-gray-200  rounded-md  dark:border-black border-opacity-50 text-white dark:text-black 
          focus:outline-none dark:focus:outline-none dark:shadow-sm  dark:shadow-black  resize-none "
        />
      </div>
      <div className=" flex justify-center">
        <button
          className={`text-white  dark:text-black bg-cyan-600   rounded py-2 px-8 ml-auto mr-auto text-[12px] transition active:scale-95 dark:shadow dark:shadow-black dark:font-semibold dark:bg-gray-200 ${
            enIsOn ? "fontPoppins leading-5" : ""
          }`}
        >
          {t("FormButton")}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
