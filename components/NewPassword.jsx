import axios from "axios";
import React, { useEffect, useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Triangle } from "react-loader-spinner";
import { successMassage } from "@/utils/msg";
import {
  selectLoading,
  RsetLoading,
  selectFormErrors,
  RsetFormErrors,
} from "@/Slices/mainSlices";
import {
  selectSignupPassword,
  RsetSignupPassword,
  selectSignupPasswordConfirm,
  RsetSignupPasswordConfirm,
} from "@/Slices/signupSlices";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  const password = useSelector(selectSignupPassword);
  const passwordConfirm = useSelector(selectSignupPasswordConfirm);
  const loading = useSelector(selectLoading);

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  const passwordIsValid = password !== "" && password.length >= 6;
  const passwordPatternIsValid = passwordPattern.test(password);
  const passwordConfirmIsValid = passwordConfirm !== "";
  const passwordConfirmed = passwordConfirm === password;
  const formErrors = useSelector(selectFormErrors);

  const formIsValid =
    passwordIsValid &&
    passwordPatternIsValid &&
    passwordConfirmIsValid &&
    passwordConfirmed;

  const showPassHandler = (e) => {
    e.preventDefault();
    setShowPass((prev) => !prev);
  };
  const showPassConfirmHandler = (e) => {
    e.preventDefault();
    setShowPassConfirm((prev) => !prev);
  };

  const verifyPassToken = async () => {
    try {
      setVerified(true);
    } catch (err) {
      setError(true);
      console.log(err.message);
      dispatch(RsetLoading(false));
    }
  };

  const validation = () => {
    var errors = {};
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

    return errors;
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyPassToken();
    }
  }, [token]);

  const handleNewPassword = async (e) => {
    e.preventDefault();
    try {
      if (formIsValid) {
        dispatch(RsetLoading(true));
        const response = await axios.post("/api/users/newpassword", {
          token,
          password,
        });
        console.log(response);
        dispatch(RsetLoading(false));
        successMassage(t("NewPassConfirmed"));
        dispatch(RsetSignupPassword(""));
        dispatch(RsetSignupPasswordConfirm(""));
        dispatch(RsetFormErrors(""));
        router.push("/login");
      } else {
        dispatch(
          RsetFormErrors(
            validation(
              passwordIsValid,
              passwordPatternIsValid,
              passwordConfirmIsValid,
              passwordConfirmed
            )
          )
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <section
      dir={!enIsOn ? "rtl" : "ltr"}
      id="features"
      className="xl:w-[1200px] w-[300px] ss:w-[500px] sm:w-[600px] md:w-[700px] lg:w-[1100px]  h-[100vh]  dark:bg-light mb-10 flex justify-center mx-auto"
    >
      <div className="rounded-lg mt-10 w-[500px] xl:p-0 ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 dark:border-none rounded-xl  bg-gray-900 dark:bg-white shadow-md">
          <h1 className="text-white dark:text-black text-center text-[24px]">
            {t("NewPassTitle")}
          </h1>

          <form
            className="space-y-4 md:space-y-7"
            onSubmit={(e) => handleNewPassword(e)}
          >
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium  dark:text-black text-white dark:font-semibold"
              >
                {t("NewPassPass")}
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  className={` bg-gray-700 text-white focus:ring-primary-800 focus:ring sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-200 dark:text-black dark:shadow  dark:placeholder-gray-400 focus:outline-none dark:focus:outline-none ${
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
                  autoComplete="off"
                  value={password}
                  onChange={(e) => {
                    dispatch(RsetSignupPassword(e.target.value));
                  }}
                />
                <button
                  onClick={(e) => showPassHandler(e)}
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
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium  dark:text-black text-white dark:font-semibold"
              >
                {t("NewPassPassConfirm")}
              </label>
              <div className="relative">
                <input
                  type={showPassConfirm ? "text" : "password"}
                  name="passwordConfirm"
                  id="passwordConfirm"
                  className={` bg-gray-700 text-white focus:ring-primary-800 focus:ring sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-200 dark:text-black dark:shadow  dark:placeholder-gray-400 focus:outline-none dark:focus:outline-none ${
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
                  autoComplete="off"
                  value={passwordConfirm}
                  onChange={(e) => {
                    dispatch(RsetSignupPasswordConfirm(e.target.value));
                  }}
                />
                <button
                  onClick={(e) => showPassConfirmHandler(e)}
                  className="absolute text-white ltr:top-2.5 ltr:right-3 rtl:top-2.5 rtl:left-3"
                >
                  {showPassConfirm ? (
                    <FontAwesomeIcon icon={faEye} />
                  ) : (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  )}
                </button>
              </div>
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
                <p>{t("NewPassConfirmation")}</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
