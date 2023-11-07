"use client";
import React, { useEffect, useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { Triangle } from "react-loader-spinner";
import Link from "next/link";
// import DatePicker from "react-datepicker2";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
// import toast, { Toaster } from "react-hot-toast";
import { errorMassage } from "@/utils/msg";
import { NumericFormat } from "react-number-format";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import axios from "axios";
import {
  selectSignupFullname,
  RsetSignupFullname,
  selectSignupGender,
  RsetSignupGender,
  selectSignupBirthdate,
  RsetSignupBirthdate,
  selectSignupNationalCode,
  RsetSignupNationalCode,
  selectSignupEmail,
  RsetSignupEmail,
  selectSignupUsername,
  RsetSignupUsername,
  selectSignupPassword,
  RsetSignupPassword,
  selectSignupPasswordConfirm,
  RsetSignupPasswordConfirm,
  selectSignupCountry,
  RsetSignupCountry,
  selectSignupPhoneNumber,
  RsetSignupPhoneNumber,
  selectSignupTerms,
  RsetSignupTerms,
  signupHandler,
  ResetSignupHandler,
  selectSignupGoogle,
  RsetSignupGoogle,
  selectSignupGoogleToken,
  RsetSignupGoogleToken,
} from "@/Slices/signupSlices";
import {
  RsetFormErrors,
  selectFormErrors,
  selectLoading,
  RsetLoading,
} from "@/Slices/mainSlices";
import { selectTicketObj, RsetTicketObj } from "@/Slices/ticketSlices";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  useEffect(() => {
    dispatch(RsetFormErrors(""));
  }, []);

  const showPassHandler = (e) => {
    e.preventDefault();
    setShowPass((prev) => !prev);
  };
  const showPassConfirmHandler = (e) => {
    e.preventDefault();
    setShowPassConfirm((prev) => !prev);
  };

  const fullname = useSelector(selectSignupFullname);
  const gender = useSelector(selectSignupGender);
  const nationalCode = useSelector(selectSignupNationalCode);
  const birthdate = useSelector(selectSignupBirthdate);
  const email = useSelector(selectSignupEmail);
  const username = useSelector(selectSignupUsername);
  const password = useSelector(selectSignupPassword);
  const passwordConfirm = useSelector(selectSignupPasswordConfirm);
  const country = useSelector(selectSignupCountry);
  const phoneNumber = useSelector(selectSignupPhoneNumber);
  const terms = useSelector(selectSignupTerms);
  const formErrors = useSelector(selectFormErrors);
  const loading = useSelector(selectLoading);
  const signupGoogle = useSelector(selectSignupGoogle);
  const ticketObj = useSelector(selectTicketObj);

  //validation
  const fullnameIsValid = fullname !== "";
  const genderIsValid = gender !== "";
  const birthdateIsValid = birthdate !== null;
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const emailPatternIsValid = emailPattern.test(email);
  const emailIsValid = email !== "";
  const usernameIsValid = username !== "";
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  const passwordIsValid = password !== "" && password.length >= 6;
  const passwordPatternIsValid = passwordPattern.test(password);
  const passwordConfirmIsValid = passwordConfirm !== "";
  const passwordConfirmed = passwordConfirm === password;
  const phoneNumberIsValid = phoneNumber !== "";
  const countryIsValid = country !== "";
  const termsIsValid = terms === true;

  const signupFormIsValid =
    fullnameIsValid &&
    genderIsValid &&
    birthdateIsValid &&
    emailIsValid &&
    emailPatternIsValid &&
    usernameIsValid &&
    passwordIsValid &&
    passwordConfirmed &&
    passwordPatternIsValid &&
    passwordConfirmIsValid &&
    phoneNumberIsValid &&
    countryIsValid &&
    termsIsValid;
  console.log(ticketObj);

  const validation = () => {
    var errors = {};
    if (!fullnameIsValid) {
      errors.fullname = true;
    }
    if (!genderIsValid) {
      errors.gender = true;
    }
    if (!birthdateIsValid) {
      errors.birthdate = true;
    }
    if (!emailIsValid) {
      errors.email = true;
    }
    if (!emailPatternIsValid) {
      errors.emailPattern = true;
    }
    if (!usernameIsValid) {
      errors.username = true;
    }
    if (!passwordIsValid) {
      errors.password = true;
    }
    if (!passwordPatternIsValid) {
      errors.passwordPatternIsValid = true;
    }
    if (!passwordConfirmIsValid) {
      errors.passwordConfirm = true;
    }
    if (!passwordConfirmed) {
      errors.passwordConfirmed = true;
    }
    if (!phoneNumberIsValid) {
      errors.phoneNumber = true;
    }
    if (!countryIsValid) {
      errors.country = true;
    }
    if (!termsIsValid) {
      errors.terms = true;
    }

    return errors;
  };

  console.log(ticketObj);

  let user = {
    fullname,
    username,
    email,
    password,
    nationalCode,
    birthdate,
    gender,
    phoneNumber,
    country,
    terms,
    signupGoogle,
    ticketObj,
  };

  // take this to the slices
  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupFormIsValid) {
      try {
        dispatch(RsetLoading(true));
        const response = await axios.post("/api/users/signup", user);
        console.log(response.data, "signup success");
        router.push("/accountcreated");
        dispatch(ResetSignupHandler());
        dispatch(RsetFormErrors(""));
        dispatch(RsetLoading(false));
      } catch (err) {
        // error(err.response.data.message);
        if (err.response.status === 400) {
          errorMassage(t("SignupEmailExist"));
        }
        if (err.response.status === 401) {
          errorMassage(t("SignupUsernameExist"));
        }
        console.log(err.message, "signup failed");
        dispatch(RsetLoading(false));
      }
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            fullnameIsValid,
            genderIsValid,
            birthdateIsValid,
            emailIsValid,
            passwordIsValid,
            passwordConfirmIsValid,
            phoneNumberIsValid,
            genderIsValid,
            countryIsValid,
            termsIsValid,
          })
        )
      );
    }
  };
  const onSignupSuccess = async (response) => {
    dispatch(RsetSignupGoogle(true));
    dispatch(RsetSignupFullname(response.profileObj.name));
    dispatch(RsetSignupUsername(response.profileObj.givenName));
    dispatch(RsetSignupEmail(response.profileObj.email));
    dispatch(RsetSignupPassword(response.profileObj.googleId));
    dispatch(RsetSignupCountry(""));
    dispatch(RsetSignupPhoneNumber(""));
    dispatch(RsetSignupTerms(true));
    dispatch(RsetSignupNationalCode(""));
    dispatch(RsetSignupBirthdate(null));
  };

  const handleSignupGoogle = async () => {
    try {
      const res = await axios.post("/api/users/signup", user);
      console.log(res.data, "signup success");

      dispatch(ResetSignupHandler());
      dispatch(RsetSignupGoogle(false));
      router.push("/accountcreated");
    } catch (err) {
      if (err.response.status === 400) {
        errorMassage(t("SignupEmailExist"));
      }
      if (err.response.status === 401) {
        errorMassage(t("SignupUsernameExist"));
      }
      if (err.response.status === 500) {
        errorMassage("check your connection");
      }
      console.log(err.message, "signup failed");
      dispatch(RsetSignupGoogle(false));
      dispatch(RsetSignupFullname(""));
      dispatch(RsetSignupUsername(""));
      dispatch(RsetSignupEmail(""));
      dispatch(RsetSignupPassword(""));
      dispatch(RsetSignupTerms(false));
    }
  };

  if (signupGoogle === true) {
    handleSignupGoogle();
  }

  const onFailure = (error) => {
    console.log("Login failed: ", error);
  };

  // let clientId = process.env.CLIENT_ID;

  useEffect(() => {
    function start() {
      gapi.client.init({
        // clientId: process.env.CLIENT_ID,
        clientId:
          "439984794014-hbtnkhdm5hjmgs0ekffbroo8cs5af8in.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  return (
    <section
      dir={!enIsOn ? "rtl" : "ltr"}
      id="features"
      className={`xl:w-[1200px]  ss:w-[500px] sm:w-[800px] md:w-[900px] lg:w-[1100px] ss:mx-auto h-[full] xl:h-[100vh]  dark:bg-light mb-10`}
    >
      <div class="flex flex-col items-center px-6 py-8 mx-auto lg:py-0  sm:w-[800px]">
        <div className="w-full bg-gray-900 dark:bg-white  rounded-lg shadow md:mt-0 xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => {
                handleSignup(e);
              }}
            >
              <GoogleLogin
                clientId={process.env.CLIENT_ID}
                onSuccess={onSignupSuccess}
                buttonText="Sign up with Google"
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                prompt="select_account"
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    className="w-full flex justify-center bg-transparent text-gray-400 hover:text-white dark:text-gray-500 dark:hover:text-black border border-gray-500 shadow hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 hover:bg-gray-800 dark:hover:bg-gray-200"
                  >
                    <img src="/googleLogo.svg" alt="" className="rtl:ml-2" />
                    <div className="mt-1 ml-2 dark:font-semibold">
                      {t("SignupWithGoogle")}
                    </div>
                  </button>
                )}
              />
              {/* or */}
              <div className="flex justify-center">
                <div className="w-[40%] border-t-2 border-gray-500 dark:border-gray-300 mt-3"></div>
                <span className="text-gray-500 dark:text-gray-500 mr-3 ml-3">
                  {t("SignupOr")}
                </span>
                <div className="w-[40%] border-t-2 border-gray-500 dark:border-gray-300 mt-3"></div>
              </div>
              {/* or */}
              <div className="flex flex-col sm:flex-row justify-between ">
                <div className="sm:w-[45%] w-full">
                  <label
                    htmlFor="fullname"
                    className="block mb-2 text-sm font-medium  dark:text-black text-white dark:font-semibold"
                  >
                    {t("SignupFullname")}
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    id="fullname"
                    className={`mb-2 bg-gray-700 text-white sm:text-sm rounded-lg block w-[100%] p-2.5 dark:bg-gray-200 dark:text-black dark:shadow focus:ring-primary-800 focus:ring dark:placeholder-gray-400 focus:outline-none dark:focus:outline-none ${
                      !fullnameIsValid && formErrors.fullname === true
                        ? "border border-red-500"
                        : ""
                    } `}
                    required=""
                    value={!signupGoogle ? fullname : ""}
                    onChange={(e) => {
                      dispatch(RsetSignupFullname(e.target.value));
                    }}
                  />
                </div>
                <div className="sm:w-[45%] w-full">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium  dark:text-black text-white dark:font-semibold"
                  >
                    {t("SignupUsername")}
                  </label>
                  <div className="relative">
                    <input
                      dir="ltr"
                      type="text"
                      name="username"
                      id="username"
                      className={` bg-gray-700 text-white sm:text-sm rounded-lg block w-[100%] p-2.5 dark:bg-gray-200 dark:text-black dark:shadow focus:ring-primary-800 focus:ring dark:placeholder-gray-400 focus:outline-none dark:focus:outline-none  ${
                        !usernameIsValid && formErrors.username === true
                          ? "border border-red-500"
                          : ""
                      } `}
                      required=""
                      value={!signupGoogle ? username : ""}
                      onChange={(e) => {
                        dispatch(RsetSignupUsername(e.target.value));
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between ">
                <div className="sm:w-[45%] w-full">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium  dark:text-black text-white dark:font-semibold"
                  >
                    {t("SignupEmail")}
                  </label>
                  <div className="relative">
                    <input
                      dir="ltr"
                      type="email"
                      name="email"
                      id="email"
                      className={` bg-gray-700 text-white sm:text-sm rounded-lg block w-[100%] p-2.5 dark:bg-gray-200 dark:text-black dark:shadow focus:ring-primary-800 focus:ring  dark:placeholder-gray-400 focus:outline-none dark:focus:outline-none ${
                        !emailIsValid &&
                        !emailPatternIsValid &&
                        formErrors.email === true &&
                        formErrors.emailPattern === true
                          ? "border border-red-500"
                          : ""
                      } ${
                        emailIsValid &&
                        !emailPatternIsValid &&
                        formErrors.emailPattern === true
                          ? "border border-red-500"
                          : ""
                      } `}
                      placeholder="name@company.com"
                      value={!signupGoogle ? email : ""}
                      onChange={(e) => {
                        dispatch(RsetSignupEmail(e.target.value));
                      }}
                    />
                    {emailIsValid &&
                      !emailPatternIsValid &&
                      formErrors.emailPattern === true && (
                        <p className="text-[10px] text-red-500 mt-1">
                          {t("SignupEmailFormatValid")}
                        </p>
                      )}
                  </div>
                </div>
                <div className="sm:w-[45%] w-full">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium  dark:text-black text-white dark:font-semibold"
                  >
                    {t("SignupPass")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder={
                        enIsOn
                          ? "More than 6 character include upper and lower cases words with number"
                          : "رمز عبور باید انگلیسی حداقل 6  کارکتر با حروف بزرگ ، کوچک و عدد باشد"
                      }
                      className={`mb-2 bg-gray-700 focus:ring-primary-800 focus:ring text-white sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-200 dark:text-black dark:shadow  dark:placeholder-gray-400 focus:outline-none dark:focus:outline-none placeholder:text-[8px] ${
                        !passwordIsValid &&
                        formErrors.password === true &&
                        "border border-red-500"
                      } 
                      ${
                        passwordIsValid &&
                        !passwordPatternIsValid &&
                        formErrors.passwordPatternIsValid === true &&
                        "border border-red-500"
                      }`}
                      required=""
                      value={!signupGoogle ? password : ""}
                      onChange={(e) => {
                        dispatch(RsetSignupPassword(e.target.value));
                      }}
                    />
                    {passwordIsValid &&
                      !passwordPatternIsValid &&
                      formErrors.passwordPatternIsValid === true && (
                        <p className="text-[10px] text-red-500">
                          {t("SignupPassValid")}
                        </p>
                      )}
                    <button
                      onClick={showPassHandler}
                      className="absolute text-white dark:text-gray-500 ltr:top-2.5 ltr:right-3 rtl:top-2.5 rtl:left-3"
                    >
                      {showPass ? (
                        <FontAwesomeIcon icon={faEye} />
                      ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between ">
                <div className="sm:w-[45%] w-full">
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium  dark:text-black text-white dark:font-semibold"
                  >
                    {t("SignupPassConfirm")}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassConfirm ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      className={`mb-2 bg-gray-700 text-white sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-200 dark:text-black dark:shadow focus:ring-primary-800 focus:ring  dark:placeholder-gray-400 focus:outline-none dark:focus:outline-none ${
                        !passwordConfirmIsValid &&
                        formErrors.passwordConfirm === true &&
                        "border border-red-500"
                      }
                        ${
                          passwordConfirmIsValid &&
                          !passwordConfirmed &&
                          formErrors.passwordConfirmed === true &&
                          "border border-red-500"
                        }`}
                      required=""
                      value={passwordConfirm}
                      onChange={(e) => {
                        dispatch(RsetSignupPasswordConfirm(e.target.value));
                      }}
                    />
                    {!passwordConfirmed &&
                      formErrors.passwordConfirmed === true && (
                        <p className="text-[10px] text-red-500">
                          {t("SignupPassConfirmValid")}
                        </p>
                      )}
                    <button
                      onClick={showPassConfirmHandler}
                      className="absolute text-white dark:text-gray-500 ltr:top-2.5 ltr:right-3 rtl:top-2.5 rtl:left-3"
                    >
                      {showPassConfirm ? (
                        <FontAwesomeIcon icon={faEye} />
                      ) : (
                        <FontAwesomeIcon icon={faEyeSlash} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="sm:w-[45%] w-full">
                  <label
                    htmlFor="meliCode"
                    className="block mb-2 text-sm font-medium  dark:text-black text-white dark:font-semibold"
                  >
                    {t("SignupNationalCode")}
                  </label>
                  <div className="relative">
                    <NumericFormat
                      className={` bg-gray-700 text-white sm:text-sm rounded-lg block w-[100%] p-2.5 dark:bg-gray-200 dark:text-black dark:shadow focus:ring-primary-800 focus:ring  dark:placeholder-gray-400 focus:outline-none dark:focus:outline-none`}
                      dir="ltr"
                      id="meliCode"
                      maxLength={10}
                      value={nationalCode}
                      onChange={(e) => {
                        dispatch(RsetSignupNationalCode(e.target.value));
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="sm:w-[45%] w-full">
                  <label
                    htmlFor="birthday"
                    className="block mb-2 text-sm font-medium  dark:text-black text-white dark:font-semibold"
                  >
                    {t("SignupBirthdate")}
                  </label>
                  <div className="relative">
                    {/* <DatePicker
                      id="birthday"
                      isGregorian={enIsOn ? true : false}
                      showTodayButton={false}
                      timePicker={false}
                      className={` bg-gray-700 text-white sm:text-sm rounded-lg block w-[100%] p-2.5 dark:bg-gray-200 dark:text-black dark:shadow focus:ring-primary-800 focus:ring dark:placeholder-gray-400 focus:outline-none dark:focus:outline-none  ${
                        !birthdateIsValid && formErrors.birthdate === true
                          ? "border border-red-500"
                          : ""
                      }`}
                      value={birthdate}
                      onChange={(value) => {
                        dispatch(RsetSignupBirthdate(value));
                      }}
                    /> */}
                    <input
                      className={` bg-gray-700 text-white sm:text-sm rounded-lg block w-[100%] p-2.5 dark:bg-gray-200 dark:text-black dark:shadow focus:ring-primary-800 focus:ring dark:placeholder-gray-400 focus:outline-none dark:focus:outline-none  ${
                        !birthdateIsValid && formErrors.birthdate === true
                          ? "border border-red-500"
                          : ""
                      }`}
                    />
                  </div>
                </div>
                <div className="sm:w-[45%] w-full">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium  dark:text-black text-white dark:font-semibold"
                  >
                    {t("SignupGender")}
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    className={`bg-gray-700  text-white sm:text-sm rounded-lg block w-[100%] p-2.5 dark:bg-gray-200 dark:text-black dark:shadow dark:placeholder-gray-400 focus:ring-primary-800 focus:ring focus:outline-none dark:focus:outline-none select-wrapper ${
                      !genderIsValid &&
                      formErrors.gender === true &&
                      "border border-red-500"
                    }`}
                    required=""
                    value={gender}
                    onChange={(e) => {
                      dispatch(RsetSignupGender(e.target.value));
                    }}
                  >
                    <option value=""></option>
                    <option value="Male">{t("SignupOption1")}</option>
                    <option value="Female">{t("SignupOption2")}</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-between">
                <div className="sm:w-[45%] w-full">
                  <label
                    htmlFor="phonenumber"
                    className="block mb-2 text-sm font-medium  dark:text-black text-white dark:font-semibold"
                  >
                    {t("SignupPhoneNumber")}
                  </label>
                  <div className="relative">
                    <NumericFormat
                      className={` bg-gray-700 text-white sm:text-sm rounded-lg block w-[100%] p-2.5 dark:bg-gray-200 dark:text-black dark:shadow focus:ring-primary-800 focus:ring  dark:placeholder-gray-400 focus:outline-none dark:focus:outline-none ${
                        !phoneNumberIsValid &&
                        formErrors.phoneNumber === true &&
                        "border border-red-500"
                      }`}
                      dir="ltr"
                      id="phonenumber"
                      maxLength={11}
                      value={phoneNumber}
                      onChange={(e) => {
                        dispatch(RsetSignupPhoneNumber(e.target.value));
                      }}
                    />
                  </div>
                </div>
                <div className="sm:w-[45%] w-full">
                  <label
                    htmlFor="country"
                    className="block mb-2 text-sm font-medium  dark:text-black text-white dark:font-semibold"
                  >
                    {t("SignupCountry")}
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    className={` bg-gray-700 text-white sm:text-sm rounded-lg block w-[100%] p-2.5 dark:bg-gray-200 dark:text-black dark:shadow  focus:ring-primary-800 focus:ring dark:placeholder-gray-400 focus:outline-none dark:focus:outline-none ${
                      !countryIsValid &&
                      formErrors.country === true &&
                      "border border-red-500"
                    } `}
                    required=""
                    value={country}
                    onChange={(e) => {
                      dispatch(RsetSignupCountry(e.target.value));
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between sm:w-[70%] w-full">
                <div className="flex items-start">
                  <div className="flex items-center h-4">
                    <input
                      id="terms"
                      aria-describedby="terms and services"
                      type="checkbox"
                      checked={terms ? true : false}
                      className="w-4 h-4 border border-whites rounded  focus:ring-3 focus:ring-primary-300 text-white accent-cyan-500  dark:focus:ring-primary-600 dark:ring-offset-gray-800 "
                      required=""
                      value={terms}
                      onChange={() => {
                        dispatch(RsetSignupTerms(!terms));
                      }}
                    />
                  </div>
                  <div className="ml-1 text-sm">
                    <label
                      htmlFor="terms"
                      className="text-gray-300 dark:text-gray-600 rtl:mr-1"
                    >
                      {t("SignupTermsAndServicesText")}
                    </label>
                    {!termsIsValid && formErrors.terms === true && (
                      <p className="text-[10px] text-red-500">
                        {t("SignupTermsValid")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="w-[100%] text-white bg-cyan-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center"
                >
                  {loading ? (
                    <Triangle
                      height="20"
                      width="80"
                      color="#fff"
                      ariaLabel="triangle-loading"
                      wrapperStyle={{ fontWeight: "bold" }}
                      visible={true}
                    />
                  ) : (
                    t("SignupBtn")
                  )}
                </button>
              </div>
              <p className="text-[12px] font-light text-gray-300 dark:text-gray-600">
                {t("SignupLogin")}
                <Link
                  href="/login"
                  className="text-[12px] text-cyan-500 hover:underline hover:text-cyan-400 dark:text-cyan-600 dark:hover:text-cyan-500 rtl:mr-1 ltr:ml-1"
                >
                  {t("SignupLoginLink")}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;

//National code pattern
// function myfunction() {
//   var xv = document.getElementById('Your-id').value;
//   if (isNaN(xv)) {
//       alert("please enter a number !");
//   } else if (xv == "") {
//       alert("please write a code !")
//   } else if (xv.length < 10) {
//       alert("your entered code is less than 10!")
//   } else {
//       var yy = 0;
//       var yv = parseInt(yv);
//       for (let i = 0; i < xv.length; i++) {
//           yv = xv[i] * (xv.length - i);
//           yy += yv;
//       }
//       var x = yy % 11;
//       if (x === 0) {
//           alert("your code is valid !");
//       } else {
//           alert("your code is invalid !");
//       }
//       yy = 0;
//   }
// }
