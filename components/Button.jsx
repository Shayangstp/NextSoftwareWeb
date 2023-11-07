import React from "react";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";

const Button = ({ styles, title, icon, dir }) => {
  const pathname = usePathname();

  let enIsOn = pathname === "/en" ? false : true;

  return (
    <div>
      {enIsOn ? (
        <button
          type="button"
          className={`flex cursor-pointer font-semibold py-2 px-6  text-[14px] sm:text-[18px] outline-none  ${styles}`}
        >
          {title}{" "}
          {icon ? (
            <span className="ltr:ml-2 rtl:mr-2">
              <FontAwesomeIcon icon={faDownload} />
            </span>
          ) : null}
        </button>
      ) : (
        <button
          type="button"
          className={`flex cursor-pointer font-semibold py-2 px-6  text-[14px] sm:text-[18px] outline-none fontPoppins ${styles}`}
        >
          {icon ? (
            <span className="ltr:mr-2 rtl:ml-2">
              <FontAwesomeIcon icon={faDownload} />
            </span>
          ) : null}
          {title}{" "}
        </button>
      )}
    </div>
  );
};

export default Button;
