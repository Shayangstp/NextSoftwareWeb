import React from "react";
import { RsetIsDarkMode, selectIsDarkMode } from "@/Slices/mainSlices";
import { useSelector, useDispatch } from "react-redux";

const DarkMode = () => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);

  return (
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
  );
};

export default DarkMode;
