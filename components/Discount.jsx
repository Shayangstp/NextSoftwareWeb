import React from "react";

const Discount = () => {
  return (
    <div>
      {/* bar */}
      <div
        dir="ltr"
        className="flex flex-row items-center justify-center lg:mr-[22%] mr-[30px] py-[6px] px-4 bg-[#1c1c1c] rounded-[10px] mb-7 w-[500px] border-2 dark:border-dashed border-dashed border-cyan-400 dark:border-black dark:bg-[#d9d9d9]"
      >
        <p
          className={`${styles.paragraph} ml-2 text-white dark:text-black dark:font-semibold dark:bg-[#d9d9d9]`}
        >
          تخفیف{" "}
          <span className="text-white dark:text-black dark:font-semibold">
            1 ماه
          </span>{" "}
          اکانت
        </p>
        <img
          src="./discount.svg"
          alt="discount"
          className="w-[32px] h-[32px] ml-1"
        />
        <span className="text-white dark:text-black">۲۰</span>
      </div>
      {/* endBar */}
    </div>
  );
};

export default Discount;
