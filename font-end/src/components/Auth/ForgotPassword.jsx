import React, { useState } from "react";
import Logo from "../../assets/MediaX Logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../Apis";
import swal from "sweetalert";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        api.ForgetPassword,
        {
          email,
        },
        {
          headers: {
            api_key: api.key,
            authantication: api.authantication,
          },
          body: JSON.stringify({ email }),
        }
      );

      console.log("Reset Password response:", response);

      const data = response.data.message;

      if (data) {
        navigate(`/forgot-password/sent/${email}`);
      } else {
        console.error("Sending email failed");
      }
    } catch (error) {
      swal({
        title: "Access Denited",
        text: "Your Email is incorrect",
        icon: "error",
        className: "black",
        button: "Okey",
      });
      console.error("Sending email failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToSignUp = () => {
    window.location.href = "/signup";
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
              <h1 title="123" className="text-[2rem] capitalize font-medium">
                Reset Password
              </h1>
              <p className="opacity-default text-paragraph_2">
                Enter your email and click "submit" button we will send you
                password reset Url to your email
              </p>
            </div>
            <form className="space-y-4">
              <input
                type="email"
                id="email"
                placeholder="Enter Your Email"
                className="p-3 rounded-lg bg-input_bg placeholder-white/[.40] w-full focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={handleSubmit}
              />

              <button
                type="submit"
                className="w-full font-semibold bg-primary text-white rounded-lg p-2 capitalize"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </form>
            <div className="space-y-2">
              <div className="flex space-x-1 capitalize items-center">
                <h1 className="opacity-default">new to netflix?</h1>
                <button
                  onClick={handleGoToSignUp}
                  className="font-semibold hover:cursor-pointer text-[1.1rem]"
                >
                  sign up now
                </button>
              </div>
              <h1 className="opacity-default text-paragraph_2">
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
