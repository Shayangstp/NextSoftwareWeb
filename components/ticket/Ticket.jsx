import React, { useContext, useEffect } from "react";
import {
  faCalendarDays,
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { StateContext } from "@/store/contextProvider";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOpenTickets,
  selectCloseTickets,
  RsetUserTickets,
  RsetClientTicketMessages,
  selectClientTicketMessages,
} from "@/Slices/mainSlices";
import axios from "axios";
import { useRouter } from "next/navigation";

const OpenTicket = ({ open, close }) => {
  const { setTicketActive, ticketActive, showConverHandler } =
    useContext(StateContext);
  const dispatch = useDispatch();

  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;
  const route = useRouter();

  const openTickets = useSelector(selectOpenTickets);
  const closeTickets = useSelector(selectCloseTickets);

  const clientTicketMessages = useSelector(selectClientTicketMessages);

  useEffect(() => {
    route.push(`/support`);
  }, []);

  useEffect(() => {
    if (openTickets.length === 0)
      openTickets.map((item) => {
        RsetClientTicketMessages(item.ticketMessage);
      });
  }, [openTickets]);

  return (
    <div>
      {ticketActive.open === "open"
        ? openTickets.map((item) => {
            return (
              <div
                className=" flex justify-between p-7 lg:w-[700px] lg:h-[110px] bg-gray-900 rounded-lg dark:bg-white dark:border shadow cursor-pointer mt-5"
                onClick={() => {
                  route.push(`/support/${item.ticketId}`);
                  showConverHandler();
                  dispatch(RsetClientTicketMessages(item.ticketMessage));
                }}
              >
                <div>
                  <p
                    className={`font-bold text-[18px] text-white dark:text-black flex-col ${
                      enIsOn ? "fontPoppins" : ""
                    }`}
                  >
                    {item.ticketSubject}
                  </p>
                  <p
                    className={`mt-2 ltr:text-[10px] sm:ltr:text-[12px] rtl:text-[10px] sm:rtl:text-[12px] text-gray-400 dark:text-gray-500 ${
                      enIsOn ? "fontPoppins" : ""
                    }`}
                  >
                    <span>
                      <FontAwesomeIcon icon={faCalendarDays} />{" "}
                    </span>
                    {item.createdDate}
                    <span
                      className={`ml-5 rtl:mr-5 ${enIsOn ? "fontPoppins" : ""}`}
                    >
                      # ticket-{item.ticketId}
                    </span>
                  </p>
                </div>
                <div className="mt-3 text-white dark:text-black">
                  <span className="mr-10 text-green-300 dark:text-green-500 dark:font-semibold border border-gray-400 rounded-2xl px-6 py-1 text-[14px]">
                    {t("OpenTickets")}
                  </span>
                  {enIsOn ? (
                    <FontAwesomeIcon icon={faChevronRight} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronLeft} />
                  )}
                </div>
              </div>
            );
          })
        : closeTickets.map((item) => {
            return (
              <div className=" flex justify-between p-7 lg:w-[700px] lg:h-[110px] bg-gray-900 rounded-lg dark:bg-white dark:border shadow cursor-pointer mt-5">
                <div>
                  <p
                    className={`font-bold text-[18px] text-white dark:text-black flex-col ${
                      enIsOn ? "fontPoppins" : ""
                    }`}
                  >
                    {item.ticketSubject}
                  </p>
                  <p
                    className={`mt-2 ltr:text-[10px] sm:ltr:text-[12px] rtl:text-[10px] sm:rtl:text-[12px] text-gray-400 dark:text-gray-500 ${
                      enIsOn ? "fontPoppins" : ""
                    }`}
                  >
                    <span>
                      {" "}
                      <FontAwesomeIcon icon={faCalendarDays} />{" "}
                    </span>
                    {item.createdDate}
                    <span
                      className={`ml-5 rtl:mr-5 ${enIsOn ? "fontPoppins" : ""}`}
                    >
                      # ticket-{item.ticketId}
                    </span>
                  </p>
                </div>
                <div className="mt-3 text-white dark:text-black">
                  <span className="mr-10 text-red-400 dark:text-red-600 dark:font-semibold border border-gray-400 rounded-2xl px-6 py-1 text-[14px]">
                    {t("CloseTickets")}
                  </span>
                  {enIsOn ? (
                    <FontAwesomeIcon icon={faChevronRight} />
                  ) : (
                    <FontAwesomeIcon icon={faChevronLeft} />
                  )}
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default OpenTicket;
