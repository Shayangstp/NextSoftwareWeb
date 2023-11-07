"use client";
import React, { useState } from "react";
import Link from "next-intl/link";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const LocalNav = () => {
  return (
    <Menu as="div" className="relative inline-block text-center ">
      <div>
        <Menu.Button
          title="language"
          className="inline-flex justify-center rounded-md bg-transparent px-2 py-1 text-sm font-semibold text-gray-900 shadow shadow-gray-500 hover:shadow-cyan-300 theme-transition"
        >
          <span>
            {" "}
            <FontAwesomeIcon
              icon={faLanguage}
              className="text-white dark:text-black"
            />
          </span>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-[60px] origin-top-right rounded-xl bg-gray-700 dark:bg-gray-300 shadow-lg  focus:outline-none text-white dark:text-black  ">
          <div className="py-1">
            <Menu.Item title="farsi">
              {({ active }) => (
                <Link
                  href="/"
                  locale="fa"
                  className={`${
                    (active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-2 py-1 rounded-xl text-sm hover:bg-gray-500 dark:hover:text-white")
                  }`}
                >
                  Fa
                </Link>
              )}
            </Menu.Item>
            <Menu.Item title="english">
              {({ active }) => (
                <Link
                  href="/"
                  locale="en"
                  className={`${
                    (active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-2 py-1 rounded-xl text-sm hover:bg-gray-500 dark:hover:text-white")
                  }`}
                >
                  En
                </Link>
              )}
            </Menu.Item>
            <Menu.Item title="arabic">
              {({ active }) => (
                <Link
                  href="/"
                  locale="en"
                  className={`${
                    (active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-2 py-1 rounded-xl text-sm hover:bg-gray-500 dark:hover:text-white")
                  }`}
                >
                  Ar
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LocalNav;
