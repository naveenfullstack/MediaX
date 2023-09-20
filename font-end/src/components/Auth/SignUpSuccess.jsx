import React from "react";
import Logo from "../../assets/MediaX Logo.svg";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function SignUpSuccess() {
  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const handleSignin = () => {
    window.location.href = "/signin";
  };

  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(https://assets.nflxext.com/ffe/siteui/vlv3/6c884f48-f7d8-4a59-9d25-b7c138813aee/67b108c1-7b39-4844-8a33-37120ace927a/LK-en-20230807-popsignuptwoweeks-perspective_alpha_website_large.jpg)`,
      }}
    >
      <div className="bg-black/[.80] w-full h-screen">
        <div className="flex justify-center items-center w-full px-2 pt-2">
          <div className="flex w-full justifu-center items-center">
            <div className="w-full">
              <img
                onClick={handleBackToHome}
                src={Logo}
                alt="logo"
                className="w-logo hover:cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex w-full text-white justify-center h-[80%] items-center">
          <div className="w-full max-w-[400px] bg-black/[.80] lg:p-10 md:p-10 sm:px-6 sm:py-10 rounded-lg space-y-8">
            <div className="space-y-2">
              <div className="flex justify-center">
                <AiOutlineCheckCircle className="text-[3rem] text-[#23B25C]" />
              </div>
              <h1
                title="123"
                className="text-[2rem] capitalize font-medium text-center"
              >
                Wellcome
              </h1>
              <p className="opacity-default text-paragraph_2 text-center">
                You have successfuly registerd your account on mediax, now you can login using credentiols you have entered when register
              </p>
            </div>
            <button
              type="submit"
              className="w-full font-semibold bg-primary text-white rounded-lg p-2 capitalize"
              onClick={handleSignin}
            >
              Sign in
            </button>
            <div className="space-y-2">
              <h1 className="opacity-default text-paragraph_2 text-center">
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
