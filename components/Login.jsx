import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Triangle } from "react-loader-spinner";
import Link from "next/link";
import {
  selectLoginEmail,
  RsetLoginEmail,
  selectLoginPassword,
  RsetLoginPassword,
  selectLoginRemeberMe,
  RsetLoginRemeberMe,
  selectLoginGoogle,
  RsetLoginGoogle,
} from "@/Slices/loginSlices";
import {
  selectLoading,
  RsetLoading,
  selectFormErrors,
  RsetFormErrors,
} from "@/Slices/mainSlices";
import { selectSignupGoogleToken } from "@/Slices/signupSlices";
import { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { errorMassage, successMassage } from "@/utils/msg";

const Login = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  const [showPass, setShowPass] = useState(false);

  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  const showPassHandler = (e) => {
    e.preventDefault();
    setShowPass((prev) => !prev);
  };

  useEffect(() => {
    dispatch(RsetFormErrors(""));
  }, []);

  const email = useSelector(selectLoginEmail);
  const password = useSelector(selectLoginPassword);
  const loading = useSelector(selectLoading);
  const loginRememberMe = useSelector(selectLoginRemeberMe);
  const formErrors = useSelector(selectFormErrors);
  const loginGoogle = useSelector(selectLoginGoogle);

  //validation
  const emailIsValid = email !== "";
  const passwordIsValid = password !== "";
  const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const emailPatternIsValid = emailPattern.test(email);

  const formIsValid = emailIsValid && passwordIsValid;

  const validation = () => {
    var errors = {};
    if (!emailIsValid) {
      errors.email = true;
    }
    if (!passwordIsValid) {
      errors.password = true;
    }
    if (!emailPatternIsValid) {
      errors.emailPattern = true;
    }
    return errors;
  };
  const forgotPassValidation = () => {
    var errors = {};
    if (!emailIsValid) {
      errors.email = true;
    }
    return errors;
  };

  let user = {
    email,
    password,
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (formIsValid) {
      try {
        dispatch(RsetLoading(true));
        const response = await axios.post("/api/users/login", user);
        console.log("Login success", response.data);
        dispatch(RsetLoginEmail(""));
        dispatch(RsetLoginPassword(""));

        // if (loginRememberMe) {
        // }
        route.push("/");
        dispatch(RsetLoading(false));
      } catch (err) {
        console.log(err.message);
        if (err.response.status === 401) {
          errorMassage(t("loginUserExist"));
        } else if (err.response.status === 400) {
          errorMassage(t("loginCombination"));
        }
        dispatch(RsetLoading(false));
      }
    } else {
      dispatch(
        RsetFormErrors(
          validation(emailIsValid, passwordIsValid, emailPatternIsValid)
        )
      );
    }
  };

  const forgetPassHandler = async (e) => {
    e.preventDefault();
    if (emailIsValid) {
      const response = await axios.post("/api/users/forgotpass", {
        email: email,
      });
      console.log(response);
      successMassage(t("NewPassCheckEmail"));
    } else {
      dispatch(RsetFormErrors(forgotPassValidation(emailIsValid)));
    }
  };
  const onLoginSuccess = async (response) => {
    dispatch(RsetLoginGoogle(true));
    dispatch(RsetLoginEmail(response.profileObj.email));
    dispatch(RsetLoginPassword(response.profileObj.googleId));
  };

  const handleLoginGoogle = async (res) => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      dispatch(RsetLoginEmail(""));
      dispatch(RsetLoginPassword(""));
      dispatch(RsetLoginGoogle(false));
      route.push("/");
    } catch (err) {
      console.log(err.message);
      dispatch(RsetLoginGoogle(false));
      dispatch(RsetLoginEmail(""));
      dispatch(RsetLoginPassword(""));
    }
  };

  if (loginGoogle === true) {
    handleLoginGoogle();
  }

  const onFailure = (error) => {
    console.log("Login failed: ", error);
  };

  return (
    <section
      dir={!enIsOn ? "rtl" : "ltr"}
      id="features"
      className={`xl:w-[1200px] w-[300px] ss:w-[500px] sm:w-[600px] md:w-[700px] lg:w-[1100px]  md:h-screen  ss:mx-auto   dark:bg-light mb-10`}
    >
      <div class="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-[400px] sm:w-[600px]">
        <div className="w-full bg-gray-900 dark:bg-white  rounded-lg shadow md:mt-0 sm:max-w-lg xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => loginHandler(e)}
            >
              <GoogleLogin
                clientId={process.env.CLIENT_ID}
                onSuccess={onLoginSuccess}
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
                      {t("loginWithGoogle")}
                    </div>
                  </button>
                )}
              />
              {/* or */}
              <div className="flex justify-center">
                <div className="w-[40%] border-t-2 border-gray-500 dark:border-gray-300 mt-3"></div>
                <span className="text-gray-500 dark:text-gray-500 mr-3 ml-3">
                  {t("loginOr")}
                </span>
                <div className="w-[40%] border-t-2 border-gray-500 dark:border-gray-300 mt-3"></div>
              </div>
              {/* or */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium  dark:text-black text-white dark:font-semibold"
                >
                  {t("loginEmail")}
                </label>
                <input
                  dir="ltr"
                  type="email"
                  name="email"
                  id="email"
                  className={` bg-gray-700 focus:ring-primary-800 focus:ring text-white sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-200 dark:text-black dark:shadow  dark:placeholder-gray-400 focus:outline-none dark:focus:outline-none ${
                    !emailIsValid && formErrors.email === true
                      ? "border border-red-500"
                      : ""
                  } ${
                    emailIsValid &&
                    !emailPatternIsValid &&
                    formErrors.emailPattern === true
                      ? "border border-red-500"
                      : ""
                  }`}
                  placeholder="name@company.com"
                  value={!loginGoogle ? email : ""}
                  onChange={(e) => {
                    dispatch(RsetLoginEmail(e.target.value.trim()));
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
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium  dark:text-black text-white dark:font-semibold"
                >
                  {t("loginPass")}
                </label>
                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    id="password"
                    className={` bg-gray-700 text-white focus:ring-primary-800 focus:ring sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-200 dark:text-black dark:shadow  dark:placeholder-gray-400 focus:outline-none dark:focus:outline-none ${
                      !passwordIsValid && formErrors.password === true
                        ? "border border-red-500"
                        : ""
                    }`}
                    autoComplete="off"
                    value={!loginGoogle ? password : ""}
                    onChange={(e) => {
                      dispatch(RsetLoginPassword(e.target.value));
                    }}
                  />
                  <button
                    onClick={showPassHandler}
                    className="absolute text-white ltr:top-2.5 ltr:right-3 rtl:top-2.5 rtl:left-3"
                  >
                    {showPass ? (
                      <FontAwesomeIcon icon={faEye} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-4">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 accent-cyan-500 focus:ring-primary-800 focus:ring bg-black focus:ring-3 focus:ring-primary-300  dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div className="ml-2 text-[12px]">
                    <label
                      htmlFor="remember"
                      className="text-gray-300 dark:text-gray-400 dark:font-semibold rtl:mr-1"
                    >
                      {t("loginRemember")}
                    </label>
                  </div>
                </div>
                <button
                  onClick={(e) => forgetPassHandler(e)}
                  className="text-[12px] font-medium text-cyan-500 hover:underline hover:text-cyan-400 dark:hover:text-cyan-500 dark:text-cyan-600 dark:font-semibold"
                >
                  {t("loginForgetPass")}
                </button>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-cyan-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex justify-center"
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
                  t("loginBtn")
                )}
              </button>
              <p className="text-[12px] font-light text-gray-300 dark:text-gray-600">
                {t("loginSignup")}
                <Link
                  href="/signup"
                  className="text-[12px] text-cyan-500 hover:underline hover:text-cyan-400 dark:text-cyan-600 dark:hover:text-cyan-500 rtl:mr-1"
                >
                  {t("loginSignupLink")}
                </Link>
              </p>
              <div id="test-Account">
                <ul className="text-[12px] text-center text-gray-500">
                  <li>username : shayan.testing1373@gmail.com</li>
                  <li>password : Testing.1373</li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
