import React, { useState } from "react";
import Logo from "../assets/MediaX Logo.svg";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import "../App.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const SignIn = () => {
    window.location.href = "/signin";
  };

  const options = [
    {
      id: 1,
      name: "profile",
      url: "https://fitwin.co",
    },
    {
      id: 2,
      name: "Account",
      url: "https://fitwin.co",
    },
    {
      id: 3,
      name: "log out",
      url: SignIn,
    },
    {
      id: 4,
      name: "profilee",
      url: "https://fitwin.co",
    },
  ];

  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearchIconClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <div className="items-center px-4 sm:hidden lg:flex md:hidden">
      <div className="flex items-center space-x-default w-9/12">
        <img src={Logo} alt="logo" className="w-logo" />
        <div className="capitalize flex space-x-8">
          <h1 className="text-white/[.60] hover:text-white hover:cursor-pointer">
            tv shows
          </h1>
          <h1 className="text-white/[.60] hover:text-white hover:cursor-pointer">
            movies
          </h1>
          <h1 className="text-white/[.60] hover:text-white hover:cursor-pointer">
            new & populer
          </h1>
          <h1 className="text-white/[.60] hover:text-white hover:cursor-pointer">
            my list
          </h1>
        </div>
      </div>

      <div className="flex w-3/12 justify-end items-center">
        <div className="relative">
          {!isSearchVisible && (
            <AiOutlineSearch
              className="cursor-pointer text-xl"
              onClick={handleSearchIconClick}
            />
          )}
          {isSearchVisible && (
            <div className="rounded border h-fit flex items-center px-2 duration-300">
              <AiOutlineSearch className="cursor-pointer text-xl" />
              <input
                type="text"
                className="p-2 bg-transparent h-fit focus:outline-none"
                placeholder="Search..."
              />
              <AiOutlineClose
                className="cursor-pointer"
                onClick={handleSearchIconClick}
              />
            </div>
          )}
        </div>

        <div className="relative">
          <IoMdArrowDropdown
            className={`text-[1.3rem] hover:cursor-pointer inline ml-1 transform ${
              isOpen ? "rotate-180" : "rotate-0"
            } transition-transform duration-300 ease-in-out`}
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <ul className="absolute top-8 w-[12rem] right-0 rounded shadow bg-input_bg z-10">
              {options.map((index) => (
                <li
                  key={index.id}
                  onClick={index.url}
                  className="capitalize cursor-pointer hover:bg-black px-4 py-2"
                >
                  {index.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
