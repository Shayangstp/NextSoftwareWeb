"use client";
import React, { useState } from "react";
import { Triangle } from "react-loader-spinner";

const LoadingPage = () => {
  return (
    <section
      id="LoadingPage"
      className={`w-[100vw] flex lg:flex-row flex-col-reverse justify-center items-center bg-primary xl:p-8 h-[100vh]`}
    >
      <Triangle
        height="80"
        width="80"
        color="#fff"
        ariaLabel="triangle-loading"
        wrapperStyle={{ fontWeight: "bold", marginTop: "20px" }}
        visible={true}
      />
      {/* gradient start */}
      <div className="absolute z-[0] w-[10%] h-[35%] top-0 pink__gradient" />
      {/* gradient end */}
    </section>
  );
};

export default LoadingPage;
