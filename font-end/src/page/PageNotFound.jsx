import React from "react";

export default function PageNotFound() {
  const handleBackToHome = () => {
    window.location.href = "/";
  };
  return (
    <div
      className="flex justify-center items-center h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(https://assets.nflxext.com/ffe/siteui/vlv3/6c884f48-f7d8-4a59-9d25-b7c138813aee/67b108c1-7b39-4844-8a33-37120ace927a/LK-en-20230807-popsignuptwoweeks-perspective_alpha_website_large.jpg)`,
      }}
    >
      <div className="bg-black/[.80] w-full h-screen flex justify-center items-center">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-red-500 mb-2">404 Error</h1>
          <p className="text-lg text-white">
            Oops! The page you are looking for does not exist.
          </p>
          <button
            onClick={handleBackToHome}
            className="text-white bg-[#303030] p-2 px-4 rounded-lg"
          >
            back to home
          </button>
        </div>
      </div>
    </div>
  );
}
