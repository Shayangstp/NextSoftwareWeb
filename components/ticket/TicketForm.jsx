import React, { useContext } from "react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { StateContext } from "@/store/contextProvider";
import {
  RsetTicketSubject,
  RsetTicketMessage,
  selectTicketMessage,
  selectTicketSubject,
} from "@/Slices/ticketSlices";
import { selectUserInfo, RsetUserInfo } from "@/Slices/mainSlices";
import { successMassage } from "@/utils/msg";
import { useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useCookies } from "react-cookie";
import { RsetUserTickets, selectUserTickets } from "@/Slices/mainSlices";

const TicketForm = () => {
  const { showSubmitHandler, ticketBtnHandler } = useContext(StateContext);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const dispatch = useDispatch();

  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  const userInfo = useSelector(selectUserInfo);
  const ticketMessage = useSelector(selectTicketMessage);
  const ticketSubject = useSelector(selectTicketSubject);
  const userTickets = useSelector(selectUserTickets);

  let user = {
    email: userInfo.email,
    ticket: {
      ticketId: Math.floor(Math.random() * 1000),
      status: "open",
      ticketSubject,
      createdDate: new Date().toLocaleString(),
      ticketMessage: [
        { message: ticketMessage, date: new Date().toLocaleString() },
      ],
      support: [
        {
          message: "",
          date: new Date().toLocaleString(),
        },
      ],
    },
  };

  const ticketHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/ticket", user);
      successMassage("Ticket submitted successfully");
      getUserData();
      dispatch(RsetTicketSubject(""));
      dispatch(RsetTicketMessage(""));
      showSubmitHandler();
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };
  console.log(userTickets);

  const getUserData = async () => {
    const res = await axios.get(
      `/api/users/getData?userEmail=${userInfo.email}`
    );
    console.log(res);
    dispatch(RsetUserTickets(res.data.ticketObj));
  };

  return (
    <form>
      <div className="flex flex-col my-4">
        <label
          // dir={!enIsOn ? "rtl" : "ltr"}
          className={`text-white text-[18px] dark:text-black mb-2 dark:font-semibold ${
            enIsOn ? "fontPoppins" : ""
          }`}
          htmlFor="subject"
        >
          {t("SubTicketSubject")}
        </label>
        <input
          // dir={!enIsOn ? "rtl" : "ltr"}
          type="text"
          className="p-2 bg-gray-700 dark:bg-gray-200  rounded-md  text-white dark:text-black w-[100%] 
          focus:outline-none dark:focus:outline-none "
          autoComplete="off"
          id="subject"
          value={ticketSubject}
          onChange={(e) => {
            dispatch(RsetTicketSubject(e.target.value));
          }}
        />
      </div>
      <div className="flex flex-col my-4">
        <label
          // dir={!enIsOn ? "rtl" : "ltr"}
          className={`text-white text-[18px] dark:text-black mb-2 dark:font-semibold ${
            enIsOn ? "fontPoppins" : ""
          }`}
          htmlFor="message"
        >
          {t("SubTicketMessage")}
        </label>
        <textarea
          // dir={!enIsOn ? "rtl" : "ltr"}
          type="text"
          className="p-2 bg-gray-700 dark:bg-gray-200  rounded-md  text-white dark:text-black w-[100%]
          focus:outline-none dark:focus:outline-none "
          autoComplete="off"
          id="message"
          rows={4}
          value={ticketMessage}
          onChange={(e) => {
            dispatch(RsetTicketMessage(e.target.value));
          }}
        />
      </div>
      <hr className="border-2 rounded-xl border-gray-700 dark:border-gray-400 mt-4" />
      <div className="flex justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            showSubmitHandler();
            ticketBtnHandler();
            dispatch(RsetTicketSubject(""));
            dispatch(RsetTicketMessage(""));
          }}
          className={`bg-transparent text-white dark:text-black border dark:border-gray-300 hover:dark:border-gray-500 rounded-md p-2 sm:w-[100px] sm:h-[45px] h-[35px] text-[10px] sm:text-[13px] mt-4 transition active:scale-95 shadow rtl:ml-2 mr-3 ${
            enIsOn ? "fontPoppins" : ""
          }`}
        >
          {t("SubTicketCancel")}
        </button>
        <button
          onClick={(e) => {
            ticketHandler(e);
          }}
          className={`w-[150px] sm:w-[200px] mt-4 sm:h-[45px] h-[35px]  text-[10px] sm:text-[13px] rounded-md bg-cyan-500 text-white transition active:scale-95 shadows ${
            enIsOn ? "fontPoppins" : ""
          }`}
        >
          {t("TicketButton1")}
        </button>
      </div>
    </form>
  );
};

export default TicketForm;
