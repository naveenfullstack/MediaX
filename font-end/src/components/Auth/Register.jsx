import React, { useState } from "react";
import Logo from "../../assets/MediaX Logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../Apis";
import swal from "sweetalert";

export default function DefaultLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    console.log("handleLogin function called");
    console.log(email, password);
    try {
      const response = await axios.post(
        api.signup,
        {
          firstname,
          lastname,
          username,
          email,
          password,
        },
        {
          headers: {
            api_key: api.key,
            authantication: api.authantication,
          },
          body: JSON.stringify({
            firstname,
            lastname,
            username,
            email,
            password,
          }),
        }
      );

      console.log("Signup response:", response);

      const accessToken = response.data.token;

      if (accessToken) {
        navigate("/signin");
      } else {
        console.error("Signup failed with access token");
      }
    } catch (error) {
      swal({
        title: "Access Denited",
        text: "Account acociated with your data already exisit",
        icon: "error",
        className: "black",
        button: "Okey",
      });
      console.error("Signup failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToSignin = () => {
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
            <h1 title="123" className="text-[2rem] capitalize font-medium">
              sign Up
            </h1>
            <form className="space-y-4">
              <div className="flex space-x-default">
                <input
                  type="text"
                  id="firstname"
                  placeholder="First Name"
                  className="p-3 rounded-lg bg-input_bg placeholder-white/[.40] w-full focus:outline-none"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  id="Lastname"
                  placeholder="Last Name"
                  className="p-3 rounded-lg bg-input_bg placeholder-white/[.40] w-full focus:outline-none"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <input
                type="test"
                id="username"
                placeholder="Username"
                className="p-3 rounded-lg bg-input_bg placeholder-white/[.40] w-full focus:outline-none"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                type="email"
                id="email"
                placeholder="Email or phone number"
                className="p-3 rounded-lg bg-input_bg placeholder-white/[.40] w-full focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="flex rounded-lg bg-input_bg p-3">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  className="bg-transparent placeholder-white/[.40] w-full focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleShowPasswordChange}
                  className="opacity-default"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button
                type="submit"
                className="w-full font-semibold bg-primary text-white rounded-lg p-2 capitalize"
                onClick={handleSignUp}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign In"}
              </button>
            </form>
            <div className="space-y-2">
              <div className="flex space-x-1 capitalize items-center">
                <h1 className="opacity-default">Already have MediaX?</h1>
                <button
                  onClick={handleGoToSignin}
                  className="font-semibold hover:cursor-pointer text-[1.1rem]"
                >
                  sign in
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
