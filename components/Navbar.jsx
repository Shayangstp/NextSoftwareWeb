"use client";
import { useState, useContext, useEffect } from "react";
import LocalNav from "./LocalNav";
import Link from "next/link";
import {
  faSun,
  faMoon,
  faBars,
  faX,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
  faTelegram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
// import SocialMedia from "./SocialMedia";
import axios from "axios";
import jwt from "jsonwebtoken";
import { useCookies } from "react-cookie";
import {
  selectUserInfo,
  RsetUserInfo,
  RsetUserTickets,
} from "@/Slices/mainSlices";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { cookies } from "next/dist/client/components/headers";
import { selectLoginRemeberMe } from "@/Slices/loginSlices";
import { RsetIsDarkMode, selectIsDarkMode } from "@/Slices/mainSlices";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const route = useRouter();

  // const pathname = usePathname();
  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);
  const userInfo = useSelector(selectUserInfo);
  const loginRememberMe = useSelector(selectLoginRemeberMe);

  const getToken = async () => {
    const response = await axios.get("/api/users/token");
    if (response.data.tokenStored.value !== "") {
      let token = response.data.tokenStored.value;
      const decodedToken = jwt.decode(token);

      //remeber Me (have to be fix)
      const expirationDate = loginRememberMe
        ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        : null;
      setCookie("token", token);
      if (expirationDate) {
        setCookie("token", expirationDate.toISOString());
      } else {
        removeCookie("token");
      }
      dispatch(RsetUserInfo(decodedToken));
    } else {
      return;
    }
  };

  const logoutHandler = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("Logout successful");
      route.push("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  // const getUserData = async () => {
  //   if (userInfo) {
  //     const res = await axios.get(
  //       `/api/users/getData?userEmail=${userInfo.email}`
  //     );
  //     console.log(res);
  //     dispatch(RsetUserTickets(res.data.ticketObj));
  //   } else {
  //     return;
  //   }
  // };

  // useEffect(() => {
  //   getUserData();
  // }, [userInfo]);

  const navLinks = [
    {
      id: "/contact",
      title: t("nav3"),
    },
    {
      id: "برنامه",
      title: t("nav2"),
    },
    {
      id: "/",
      title: t("nav1"),
    },
  ];

  const navLinksPopup = [
    {
      id: "/",
      title: t("nav1"),
    },
    {
      id: "برنامه",
      title: t("nav2"),
    },
    {
      id: "/contact",
      title: t("nav3"),
    },
    {
      id: "/support",
      title: t("nav5"),
    },
  ];

  return (
    <nav className="relative w-full xl:w-[1280px] flex py-2 justify-between items-center navbar mb-[40px] z-[10] mt-3">
      <div className="relative w-[200px] h-[100px] mt-2">
        <img
          src={isDarkMode ? "/softwareLogoLight.png" : "/softwareLogoDark.png"}
          alt="software"
          className="absolute top-[-40px] left-[-60px] object-fill ml-10 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            route.push("/");
          }}
        />
      </div>
      <ul className="list-none md:flex hidden justify-end items-center flex-1 mr-4 mt-5">
        {userInfo && userInfo.id ? (
          <>
            {" "}
            <li
              className={`flex  items-center justify-center cursor-pointer text-[13px] rounded mr-10 ml-2 dark:text-black dark:bg-gradient-to-r dark:from-cyan-300 dark:to-white hover:dark:bg-gradient-to-r hover:dark:from-cyan-200 hover:dark:to-gray-100 dark:font-semibold text-white   px-5 py-3 transition duration-150 ease-in-out active:scale-95   bg-gradient-to-r from-cyan-400 to-black hover:bg-gradient-to-r hover:from-cyan-500 hover:to-gray-900 theme-transition  ${
                enIsOn ? "fontPoppins leading-5" : ""
              }`}
            >
              <Link href="/support">{t("nav5")}</Link>
            </li>
            <li
              className={`flex items-center justify-center cursor-pointer text-[13px] mr-5 ml-2 dark:text-black  text-white hover:shadow-navbarBtn dark:hover:shadow dark:rounded dark:shadow-gray-200 hover:shadow-cyan-200   dark:border-black dark:hover:border-black px-5 py-3 dark:font-semibold theme-transition ${
                enIsOn ? "fontPoppins leading-5" : ""
              }`}
            >
              {t("nav4")}
              <span className="ml-2 animate-bounce">
                <FontAwesomeIcon icon={faDownload} />
              </span>
            </li>{" "}
          </>
        ) : null}

        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`${
              enIsOn ? "fontPoppins leading-5" : ""
            } font-normal px-5 py-3 cursor-pointer text-[13px]  dark:font-semibold mr-5 ml-2 dark:text-black hover:shadow-navbarBtn dark:hover:shadow dark:rounded dark:shadow-gray-200 hover:shadow-cyan-200 theme-transition  ${
              active === nav.title
                ? "text-cyan-200 dark:text-cyan-700"
                : "text-white dark:text-black"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"} `}
            onClick={() => setActive(nav.title)}
          >
            <Link href={`${nav.id}`}>{nav.title}</Link>
          </li>
        ))}
      </ul>

      <button
        onClick={() => dispatch(RsetIsDarkMode(!isDarkMode))}
        className={`hidden px-2.5 py-1.5 rounded-md absolute bg-transparent top-[2px] right-[30px] justify-center items-center text-white theme-transition dark:text-black md:flex shadow shadow-gray-500 hover:shadow-cyan-300`}
      >
        {isDarkMode ? (
          <FontAwesomeIcon icon={faSun} />
        ) : (
          <FontAwesomeIcon icon={faMoon} />
        )}
      </button>

      <div className="md:hidden flex flex-1 justify-end items-center cursor-pointer">
        <button
          className="w-[28px] h-[28px] object-contain text-white dark:text-black"
          onClick={() => setToggle(!toggle)}
        >
          {!toggle ? (
            <FontAwesomeIcon icon={faBars} />
          ) : (
            <FontAwesomeIcon icon={faX} />
          )}
        </button>

        <div
          className={`${
            !toggle ? "hidden" : "flex flex-col"
          } p-6 bg-black-gradient dark:bg-white absolute top-[100px] right-[-35px] mx-4 my-2 min-w-[300px] rounded-xl h-[400px] sidebar z-20`}
        >
          <div dir={enIsOn ? "rtl" : "ltr"} className="flex flex-col">
            <div className="flex justify-between items-center mb-5">
              <LocalNav />
              <div className="md:flex text-white dark:text-black text-[12px] ">
                <Link
                  className="mr-1 hover:text-cyan-200 dark:hover:text-cyan-700"
                  href="/login"
                >
                  {t("heroBtn2")}
                </Link>{" "}
                |{" "}
                <Link
                  className="ml-1 hover:text-cyan-200 dark:hover:text-cyan-700"
                  href="/signup"
                >
                  {t("heroBtn1")}
                </Link>
              </div>
              <button
                onClick={() => dispatch(RsetIsDarkMode(!isDarkMode))}
                className=" text-white w-[10px] mr-5 "
              >
                {isDarkMode ? (
                  <FontAwesomeIcon icon={faSun} />
                ) : (
                  <FontAwesomeIcon icon={faMoon} />
                )}
              </button>
            </div>

            <ul className="list-none flex justify-start items-end flex-1 flex-col">
              <li
                dir={!enIsOn ? "rtl" : "ltr"}
                className={`${
                  active === "دانلود دمو" ? "text-white" : "text-gray-400"
                }font-medium cursor-pointer text-[16px] hover:text-secondary mb-3 text-gray-400`}
              >
                {t("nav4")}{" "}
                <span className="ml-1">
                  <FontAwesomeIcon icon={faDownload} />
                </span>
              </li>
              {navLinksPopup.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-medium cursor-pointer text-[16px] hover:text-secondary ${
                    active === nav.title ? "text-white" : "text-gray-400"
                  } mb-3`}
                  onClick={() => setActive(nav.title)}
                >
                  <Link href={`${nav.id}`}>{nav.title}</Link>
                </li>
              ))}
            </ul>
            <hr className="mt-6" />
            <div className="flex flex-row text-white justify-center text-2xl mt-3">
              {/* <SocialMedia /> */}
              <div>
                <button className="mr-2 hover:text-secondary">
                  <FontAwesomeIcon icon={faInstagram} />
                </button>
                <button className="mr-2 hover:text-secondary">
                  <FontAwesomeIcon icon={faWhatsapp} />
                </button>
                <button className="mr-2 hover:text-secondary">
                  <FontAwesomeIcon icon={faTelegram} />
                </button>
                <button className="mr-2 hover:text-secondary">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex absolute top-[2px] right-[-10px] ">
        <LocalNav />
      </div>
      {userInfo === null ? (
        <div className="hidden md:flex absolute top-[6px] right-[80px] text-white dark:text-black text-[12px] ">
          <Link
            className="mr-1 hover:text-cyan-200 dark:hover:text-cyan-700"
            href="/login"
          >
            {t("heroBtn2")}
          </Link>{" "}
          |{" "}
          <Link
            className="ml-1 hover:text-cyan-200 dark:hover:text-cyan-700"
            href="/signup"
          >
            {t("heroBtn1")}
          </Link>
        </div>
      ) : (
        <div className="hidden md:flex absolute top-[6px] right-[80px] text-white dark:text-black text-[12px] ">
          <p className="mr-1">{userInfo.username}</p>|{" "}
          <button
            className="ml-1 hover:text-cyan-200 dark:hover:text-cyan-700"
            onClick={logoutHandler}
          >
            {t("Logout")}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
