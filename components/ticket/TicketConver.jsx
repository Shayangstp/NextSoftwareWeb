import React, { useEffect, useState, useContext } from "react";
import { useTranslations } from "next-intl";
import { StateContext } from "@/store/contextProvider";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { selectClientTicketMessages } from "@/Slices/mainSlices";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInfo } from "@/Slices/mainSlices";
import {
  selectTicketAddMessage,
  RsetTicketAddMessage,
  selectOpenTicket,
  RsetTicketId,
} from "@/Slices/ticketSlices";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  RsetUserTickets,
  selectOpenTickets,
  RsetTicketIdReload,
  selectTicketIdReload,
} from "@/Slices/mainSlices";
import { useRouter } from "next/navigation";
import { errorMassage, successMassage } from "@/utils/msg";
import { connect } from "@/db/dbConfig";

const TicketConver = () => {
  const [msg, setMsg] = useState();
  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;
  const {
    ticketBtn,
    ticketBtnHandler,
    showConver,
    showSubmitHandler,
    showConverHandler,
    showSubmit,
  } = useContext(StateContext);
  // const router = useRouter();

  const dispatch = useDispatch();

  const userInfo = useSelector(selectUserInfo);
  const ticketAddMessage = useSelector(selectTicketAddMessage);
  const ticketIdReload = useSelector(selectTicketIdReload);

  const { id } = useParams();
  const route = useRouter();

  console.log(id);
  // console.log(postData);

  //its not completed and its static and if the ticket is open make the conversaion open and let client to type and asked after the support response
  const clientTicketMessages = useSelector(selectClientTicketMessages);
  const openTickets = useSelector(selectOpenTickets);

  // console.log(clientTicketMessages);
  useEffect(() => {
    dispatch(RsetTicketIdReload(id));
  }, []);

  const addMessageHandler = async (e) => {
    e.preventDefault();
    if (ticketAddMessage !== "") {
      try {
        const res = await axios.patch("/api/users/ticketMessages", {
          userId: userInfo.id,
          ticketId: Number(id),
          ticketMessage: ticketAddMessage,
        });
        console.log(res);
        successMassage("ticket updated successfully");
        dispatch(RsetTicketAddMessage(""));
        showConverHandler();
      } catch (err) {
        console.log(err);
      }
    } else {
      errorMassage("Please type your message");
    }
  };

  return (
    <div className="p-5 dark:border rounded-xl dark:bg-white bg-gray-900 shadow w-[1000px]">
      <div className="mb-5 ">
        {clientTicketMessages.map((item) => {
          return (
            <div>
              <div class="flex items-center text-white mt-5 mb-2 ">
                <img
                  className="w-10 h-10 rounded-full ltr:mr-2 rtl:ml-2   text-white"
                  src="/profile.png"
                  alt="avatar"
                />
                <div className="text-sm">
                  <p
                    className={`leading-none  dark:text-black dark:font-semibold mb-1 text-xs text-gray-200  ${
                      enIsOn ? "fontPoppins" : ""
                    }`}
                  >
                    {userInfo.fullname}
                  </p>
                  <p className="text-gray-400 text-xs">{item.date}</p>
                </div>
              </div>
              <div className="flex ml-[30px]">
                <div className="text-white -rotate-6 opacity-50 rtl:ml-2">
                  <FontAwesomeIcon icon={faMessage} />
                </div>
                <p className="text-white w-[500px]  text-[14px] ml-2 text-base">
                  {item.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <form className="flex flex-col  mt-10">
        <textarea
          type="text"
          className="p-4 bg-gray-700 dark:bg-gray-200  rounded-md  text-white dark:text-black 
                focus:outline-none dark:focus:outline-none w-[100%]"
          autoComplete="off"
          id="message"
          rows={4}
          placeholder="Type your message"
          value={ticketAddMessage}
          onChange={(e) => {
            dispatch(RsetTicketAddMessage(e.target.value));
          }}
        />
        <div className="flex justify-end">
          <button className=" text-white mr-1 text-sm  mt-4 py-2.5 px-6 rounded border border-red-500  hover:bg-red-600 transition active:scale-95">
            Close ticket
          </button>
          <button
            onClick={(e) => {
              addMessageHandler(e);
            }}
            className="text-white text-sm  mt-4 py-2.5 px-6 rounded bg-cyan-600 hover:bg-cyan-500 transition active:scale-95"
          >
            Create message
          </button>
        </div>
      </form>
    </div>
  );
};

export default TicketConver;
