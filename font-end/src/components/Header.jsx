import React, { useState } from "react";
import Logo from "../assets/MediaX Logo.svg";
import { IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

export default function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("_userData");
    window.location.href = "/signin";
  };

  const handleSearch = () => {
    navigate(`/search/${search}`);
  };

  const Home = () => {
    navigate(`/`);
  };

  const movies = () => {
    navigate(`/movies`);
  };

  const mylist = () => {
    navigate(`/movies`);
  };

  const ResetPassword = () => {
    navigate(`/forgot-password`);
  };

  const options = [
    {
      id: 1,
      name: "log out",
      url: logout,
    },
    {
      id: 2,
      name: "Reset Password",
      url: ResetPassword,
    },
  ];

  const mobileoptions = [
    {
      id: 1,
      name: "Movies",
      url: movies,
    },
    {
      id: 1,
      name: "My List",
      url: mylist,
    },
    {
      id: 1,
      name: "log out",
      url: logout,
    },
    {
      id: 2,
      name: "Reset Password",
      url: ResetPassword,
    },
  ];

  const handleSearchIconClick = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/search/${search}`);
    }
  };

  // Function to determine if the menu item is active
  const isMenuItemActive = (path) => {
    return location.pathname === path
      ? "text-white font-medium"
      : "text-white/[.60]";
  };

  return (
    <div>
      <div className="items-center px-4 sm:hidden lg:flex md:hidden text-white">
        <div className="flex items-center space-x-default w-9/12">
          <img
            onClick={Home}
            src={Logo}
            alt="logo"
            className="w-logo cursor-pointer"
          />
          <div className="capitalize flex space-x-8">
            {/* <h1
            className={`hover:text-white hover:cursor-pointer ${isMenuItemActive(
              "/tv-shows"
            )}`}
            onClick={() => navigate("/tv-shows")}
          >
            tv shows
          </h1> */}
            <h1
              className={`hover:text-white hover:cursor-pointer ${isMenuItemActive(
                "/movies"
              )}`}
              onClick={() => navigate("/movies")}
            >
              movies
            </h1>
            {/* <h1
            className={`hover:text-white hover:cursor-pointer ${isMenuItemActive(
              "/box-office"
            )}`}
            onClick={() => navigate("/box-office")}
          >
            Box Office
          </h1> */}
            <h1
              className={`hover:text-white hover:cursor-pointer ${isMenuItemActive(
                "/my-list"
              )}`}
              onClick={() => navigate("/my-list")}
            >
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
                <AiOutlineSearch
                  onClick={handleSearch}
                  className="cursor-pointer text-xl"
                />
                <input
                  type="text"
                  className="p-2 bg-transparent h-fit focus:outline-none"
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyUp={handleKeyPress}
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

      <div className="bg-black items-center px-4 lg:hidden sm:flex text-white h-[50px]">
        <div className="w-3/12">
          <img
            onClick={Home}
            src={Logo}
            alt="logo"
            className="w-logo cursor-pointer"
          />
        </div>

        <div className="relative w-9/12 flex justify-end items-center">
          <div className="relative max-w-[250px]">
            {!isSearchVisible && (
              <AiOutlineSearch
                className="cursor-pointer text-xl"
                onClick={handleSearchIconClick}
              />
            )}
            {isSearchVisible && (
              <div className="rounded border h-fit flex items-center px-2 duration-300">
                <AiOutlineSearch
                  onClick={handleSearch}
                  className="cursor-pointer text-xl"
                />
                <input
                  type="text"
                  className="p-2 bg-transparent h-fit focus:outline-none max-w-[150px]"
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyUp={handleKeyPress}
                />
                <AiOutlineClose
                  className="cursor-pointer"
                  onClick={handleSearchIconClick}
                />
              </div>
            )}
          </div>

          <div>
            <IoMdArrowDropdown
              className={`text-[1.3rem] hover:cursor-pointer inline ml-1 transform ${
                isOpen ? "rotate-180" : "rotate-0"
              } transition-transform duration-300 ease-in-out`}
              onClick={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
              <ul className="absolute top-8 w-[12rem] right-0 rounded shadow bg-input_bg z-10">
                {mobileoptions.map((index) => (
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
    </div>
  );
}
