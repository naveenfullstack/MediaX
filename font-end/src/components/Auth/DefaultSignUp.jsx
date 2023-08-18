import React from "react";
import Logo from "../../assets/MediaX Logo.svg";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function DefaultSignUp() {
  
  return (
    <div
      className="h-screen text-white bg-cover bg-center"
      style={{
        backgroundImage: `url(https://assets.nflxext.com/ffe/siteui/vlv3/6c884f48-f7d8-4a59-9d25-b7c138813aee/67b108c1-7b39-4844-8a33-37120ace927a/LK-en-20230807-popsignuptwoweeks-perspective_alpha_website_large.jpg)`,
      }}
    >
      <div className="bg-black/[.80] w-full h-screen">
        <div className="flex justify-center items-center w-full px-2 pt-2">
          <div className="flex w-full max-w-default justifu-center items-center">
            <Link to="/" className="w-2/4">
              <img
                src={Logo}
                alt="logo"
                className="w-logo hover:cursor-pointer"
              />
            </Link>
            <div className="w-2/4 flex justify-end">
              <Link className="bg-primary p-2 px-4 h-fit capitalize font-semibold rounded-lg" to="/signin">sign in</Link>
            </div>
          </div>
        </div>

        <div className="flex justify-center h-[80%] items-center">
          <div className="space-y-4">
            <div className="text-center capitalize opacity-default space-y-4">
              <h1 className="lg:text-[3.5rem] md:text-[2rem] sm:text-[2rem] font-semibold sm:px-8 text-white">
                Unlimited movies, TV shows, and more
              </h1>
              <h1 className="lg:text-[1.4rem]">
                Watch anywhere. Cancel anytime.
              </h1>
              <h1 className="lg:text-[1.4rem]">
                Ready to watch? Enter your email to create or restart your
                membership
              </h1>
            </div>
            <div className="space-x-2 justify-center sm:hidden lg:flex md:flex">
              <form>
                <input
                  className="p-3 rounded-lg bg-black/[.80] border-white/[.30] border-default placeholder-white/[.30] w-[25rem]"
                  type="email"
                  placeholder="Email"
                />
              </form>
              <div className="bg-primary p-2 rounded-lg flex items-center text-[1.2rem]">
                <Link className="capitalize font-semibold pl-2" to="/signin">get started</Link>
                <IoIosArrowForward className="text-[1.5rem]" />
              </div>
            </div>

            <div className="space-y-4 px-2 sm:block lg:hidden md:hidden">
              <form>
                <input
                  className="p-3 rounded-lg bg-black/[.80] border-white/[.30] border-default placeholder-white/[.30] w-full"
                  type="email"
                  placeholder="Email"
                />
              </form>
              <div className="w-full flex justify-center">
                <div className="w-fit bg-primary p-2 rounded-lg flex items-center text-[1.2rem] justify-center">
                  <Link className="capitalize font-semibold pl-2" to="/signin">get started</Link>
                  <IoIosArrowForward className="text-[1.5rem]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
