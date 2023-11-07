import React, { useContext, useState } from "react";
import NoTicket from "./NoTicket";
import Ticket from "./Ticket";
import { useTranslations } from "next-intl";
import { StateContext } from "@/store/contextProvider";
import OpenTicket from "./Ticket";
import {
  RsetUserTickets,
  selectUserTickets,
  selectUserInfo,
  RsetOpenTickets,
  selectOpenTickets,
  RsetCloseTickets,
  selectCloseTickets,
  RsetLoading,
  selectLoading,
} from "@/Slices/mainSlices";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Triangle } from "react-loader-spinner";

const PreTicket = () => {
  const { setTicketActive, ticketActive, openHandler, closeHandler } =
    useContext(StateContext);
  const dispatch = useDispatch();

  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  const userTickets = useSelector(selectUserTickets);
  const userInfo = useSelector(selectUserInfo);
  const openTickets = useSelector(selectOpenTickets);
  const closeTickets = useSelector(selectCloseTickets);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    if (userTickets.length > 0) {
      dispatch(
        RsetOpenTickets(userTickets.filter((item) => item.status === "open"))
      );
      dispatch(
        RsetCloseTickets(userTickets.filter((item) => item.status === "close"))
      );
      dispatch(RsetLoading(false));
    } else {
      dispatch(RsetLoading(true));
    }
  }, [userTickets]);

  //make loading for fetching data

  setInterval(() => {
    dispatch(RsetLoading(false));
  }, 3000);

  return (
    <div>
      {loading === false ? (
        <div className="flex mb-5">
          <div className="flex flex-col">
            <div className="xl:w-[1200px]  sm:w-[500px] md:w-[700px] lg:w-[1100px] flex flex-col lg:flex-row lg:justify-center">
              <div className="flex flex-col items-center shadow justify-center lg:w-[300px] lg:h-[120px] w-[100%] h-[100px]  rounded-lg bg-gray-900 dark:bg-white dark:border mt-4">
                <button
                  onClick={() =>
                    setTicketActive({
                      open: "open",
                      close: "",
                    })
                  }
                  className={`flex items-center justify-between w-[90%] lg:w-[250px] h-[40px] rounded-lg cursor-pointer   ${
                    ticketActive.open === "open" &&
                    "bg-gray-700 dark:bg-gray-200 "
                  }`}
                >
                  <p className="ml-4 rtl:mr-4 text-[14px] font-semibold text-white dark:text-black">
                    {t("TicketOpenPre")}
                  </p>
                  <p className="mr-4 rtl:ml-4 text-[14px] bg-slate-800 dark:bg-white w-[50px] text-center rounded-xl text-white dark:text-black">
                    {userTickets.length > 0 ? openTickets.length : 0}
                  </p>
                </button>
                <button
                  onClick={() =>
                    setTicketActive({
                      open: "",
                      close: "close",
                    })
                  }
                  className={`flex items-center justify-between w-[90%] lg:w-[250px] h-[40px] rounded-lg cursor-pointer ${
                    ticketActive.close === "close" &&
                    "bg-gray-700 dark:bg-gray-200 "
                  }`}
                >
                  <p className="ml-4 rtl:mr-4 text-[14px] font-semibold text-white dark:text-black">
                    {t("TicketClosePre")}
                  </p>
                  <p className="mr-4 rtl:ml-4 text-[14px] bg-slate-800 dark:bg-white w-[50px] text-center rounded-xl text-white dark:text-black">
                    {userTickets.length > 0 ? closeTickets.length : 0}
                  </p>
                </button>
              </div>
              <div>
                <div className="lg:rtl:mr-5 lg:ltr:ml-5">
                  {ticketActive.open === "open" ? (
                    <div>
                      {userTickets.length > 0 && openTickets.length !== 0 ? (
                        <Ticket />
                      ) : (
                        <NoTicket />
                      )}
                    </div>
                  ) : (
                    <div>
                      {userTickets.length > 0 && closeTickets.length !== 0 ? (
                        <Ticket />
                      ) : (
                        <NoTicket />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Triangle
          height="80"
          width="80"
          color="#fff"
          ariaLabel="triangle-loading"
          wrapperStyle={{ fontWeight: "bold", marginTop: "20px" }}
          visible={true}
        />
      )}
    </div>
  );
};

export default PreTicket;
