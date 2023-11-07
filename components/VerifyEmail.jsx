import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { Triangle } from "react-loader-spinner";
import { selectLoading, RsetLoading } from "@/Slices/mainSlices";

const VerifyEmail = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const t = useTranslations("index");
  const pathname1 = window.location.pathname;
  const enIsOn = pathname1.indexOf("/en") === 0;

  const loading = useSelector(selectLoading);

  const verifyUserEmail = async () => {
    try {
      dispatch(RsetLoading(true));
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      dispatch(RsetLoading(false));
    } catch (err) {
      setError(true);
      console.log(err.message);
      dispatch(RsetLoading(false));
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <section
      dir={!enIsOn ? "rtl" : "ltr"}
      id="features"
      className="flex justify-center mt-10 h-[100vh] ml-10 mr-10 sm:ml-0 sm:mr-0"
    >
      {!loading ? (
        <div className="rounded-lg mt-10 sm:max-w-lg xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 dark:border-none rounded-xl  bg-gray-900 dark:bg-white shadow-md">
            <h1 className="text-white dark:text-black text-center text-[24px]">
              {t("VerifyTitle")}
            </h1>
            {verified && (
              <div className="flex flex-col justify-center items-center">
                <p className="text-white dark:text-black dark:font-semibold text-[16px] text-center">
                  {t("VerifySubSuccess")}
                </p>
                <Link
                  href="/login"
                  className="text-white bg-cyan-500 px-6 py-1.5 hover:bg-cyan-400 w-[200px] text-center mt-5 rounded  "
                >
                  {t("VerifyLogin")}
                </Link>
              </div>
            )}
            {error && (
              <div>
                <p className="text-white dark:text-black text-center text-[16px]">
                  {t("VerifyError")}
                </p>
              </div>
            )}
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
    </section>
  );
};

export default VerifyEmail;
