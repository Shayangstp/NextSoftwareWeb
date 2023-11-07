import React, { useState, useContext, useEffect } from "react";
import TicketSubmit from "./TicketSubmit";
import PreTicket from "./PreTicket";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StateContext } from "@/store/contextProvider";
import { useTranslations } from "next-intl";
import TicketConver from "./TicketConver";
import {
  RsetUserTickets,
  selectUserInfo,
  selectUserTickets,
} from "@/Slices/mainSlices";
import axios from "axios";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

const Support = () => {
  const {
    ticketBtn,
    ticketBtnHandler,
    showConver,
    showSubmitHandler,
    showConverHandler,
    showSubmit,
  } = useContext(StateContext);
  const dispatch = useDispatch();

  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  const userInfo = useSelector(selectUserInfo);
  const userTickets = useSelector(selectUserTickets);

  const getUserData = async () => {
    if (userInfo) {
      const res = await axios.get(
        `/api/users/getData?userEmail=${userInfo.email}`
      );
      dispatch(RsetUserTickets(res.data.ticketObj));
    } else {
      return;
    }
  };

  const { id } = useParams();

  useEffect(() => {
    getUserData();
  }, [userInfo]);

  console.log(showConver);
  console.log(ticketBtn);

  return (
    <section
      dir={!enIsOn ? "rtl" : "ltr"}
      id="features"
      className={`xl:w-[1200px] w-[300px] ss:w-[500px] sm:w-[600px] md:w-[700px] lg:w-[1100px] ml-auto mr-auto dark:bg-light mb-10 flex flex-col items-center min-h-screen`}
    >
      <div className="flex justify-between w-[92%] h-[50px] mb-3">
        {!showConver ? (
          <p
            className={`text-white dark:text-black font-bold mb-5 text-[15px] ${
              enIsOn ? "fontPoppins" : ""
            } sm:text-[32px] ss:text-[24px]`}
          >
            {!showSubmit ? t("TicketTitle1") : t("TicketTitle2")}
          </p>
        ) : (
          <p
            className={`text-white dark:text-black font-bold mb-5 text-[15px] ${
              enIsOn ? "fontPoppins" : ""
            } sm:text-[32px] ss:text-[24px]`}
          >
            {id ? "#Ticket-" + id : ""}
          </p>
        )}
        {!showConver ? (
          <div>
            <div dir={!enIsOn ? "rtl" : "ltr"} className="mb-2">
              {!ticketBtn ? (
                <button
                  className={`w-[150px] sm:w-[200px] sm:h-[45px] h-[35px]  text-[10px] sm:text-[13px] rounded-md bg-cyan-500 text-white transition active:scale-95 shadows ${
                    enIsOn ? "fontPoppins" : ""
                  }`}
                  onClick={() => {
                    showSubmitHandler();
                    ticketBtnHandler();
                  }}
                >
                  <span className="mr-2 rtl:ml-2">
                    <FontAwesomeIcon icon={faCirclePlus} />
                  </span>
                  {t("TicketButton1")}
                </button>
              ) : (
                <button
                  className={`w-[120px] sm:w-[180px] sm:h-[45px] font-[600] h-[35px] text-[10px] sm:text-[13px] rounded-md bg-gray-300 text-black transition active:scale-95 shadow ${
                    enIsOn ? "fontPoppins" : ""
                  }`}
                  onClick={() => {
                    showSubmitHandler();
                    ticketBtnHandler();
                  }}
                >
                  {t("TicketButton2")}
                </button>
              )}
            </div>
          </div>
        ) : (
          <button
            className={`w-[120px] sm:w-[180px] sm:h-[45px] font-[600] h-[35px] text-[10px] sm:text-[13px] rounded-md bg-gray-300 text-black transition active:scale-95 shadow ${
              enIsOn ? "fontPoppins" : ""
            }`}
            onClick={showConverHandler}
          >
            {t("TicketButton2")}
          </button>
        )}
      </div>

      <div className="mt-5">
        {!showConver ? (
          <div> {showSubmit ? <TicketSubmit /> : <PreTicket />} </div>
        ) : (
          <div className="w-[100%] min-h-screen mb-10">
            <TicketConver />
          </div>
        )}
      </div>

      {/* gradient start */}
      <div className="absolute z-[0] w-[15%] h-[15%] top-2  left-20  pink__gradient" />
      <div className="absolute z-[0] w-[20%] h-[20%] top-2  left-20  blue__gradient" />
      {/* gradient end */}
    </section>
  );
};

export default Support;
