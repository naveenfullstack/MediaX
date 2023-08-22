import React, { useState } from "react";
import Logo from "../../assets/MediaX Logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../Apis";
import swal from "sweetalert";
import { useAuth } from "../../context/AuthContext";


export default function DefaultLogin() {
  const {login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleBackToHome = () => {
    window.location.href = "/";
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };


  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("handleLogin function called");
    console.log(email,password)
    try {
      const response = await axios.post(
        api.login,
        {
          email,
          password,
        },
        {
          headers: {
            api_key: api.key,
            authantication: api.authantication,
          },
          body: JSON.stringify({ email, password }),
        }
      );

      console.log("Login response:", response);

      const accessToken = response.data.accessToken;

      if (accessToken) {
        // Successfully logged in, set the token using setToken function
        login(accessToken);
        navigate("/");
      } else {
        console.error("Login failed with access token");
      }
    } catch (error) {
      swal({
        title: "Access Denited",
        text: "Your username or password incorrect",
        icon: "error",
        className: "black",
        button: "Okey",
      });
      console.error("Login failed:", error);
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
            <h1 title="123" className="text-[2rem] capitalize font-medium">
              sign in
            </h1>
            <form className="space-y-4">
              <input
                type="email"
                id="email"
                placeholder="Email or phone number"
                className="p-3 rounded-lg bg-input_bg placeholder-white/[.40] w-full focus:outline-none"
                value={email}
                //onChange={handleEmailChange}
                onChange={(e) => setEmail(e.target.value)}
              />

              <div className="flex rounded-lg bg-input_bg p-3">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  className="bg-transparent placeholder-white/[.40] w-full focus:outline-none"
                  value={password}
                  //onChange={handlePasswordChange}
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

              <div className="flex items-center">
                <div className="w-2/4">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    className="mr-2"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                  <label
                    htmlFor="rememberMe"
                    className="opacity-default text-paragraph"
                  >
                    Remember Me
                  </label>
                </div>
                <div className="w-2/4 flex justify-end">
                  <div className="capitalize opacity-default hover:underline text-paragraph hover:cursor-pointer">
                    need help
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full font-semibold bg-primary text-white rounded-lg p-2 capitalize"
                onClick={handleLogin}
              >
                sign In
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
