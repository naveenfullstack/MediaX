import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import "../src/App.css";
import axios from "axios";

/* IMPORT COMPONENTS */
import Home from "./page/Home";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import PageNotFound from "../src/page/PageNotFound";
import Player from "./components/Player";
import ForgetPasswordEmailSent from "./components/Auth/ForgetPasswordEmailSent";
import SearchResults from "./components/SearchResults";
import Movies from "./page/Movies";

export default function App() {
  // Initialize userData to an empty object to avoid undefined errors
  const userData = JSON.parse(localStorage.getItem("_userData")) || {};
  const ACCESS_TOKEN = userData.accessToken;
  const REFRESH_TOKEN = userData.refreshToken;

  useEffect(() => {
    if (ACCESS_TOKEN) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
      axios.defaults.headers.common["User-Rt"] = `${REFRESH_TOKEN}`;
      document.cookie = `at=${ACCESS_TOKEN}`;

      // Set a timer to clear local storage after 1 hour
      const clearLocalStorageAfter1Hour = () => {
        localStorage.removeItem("_userData");
        document.cookie = "at=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      };

      // Set the timer for 1 hour (3600 seconds)
      const oneHour = 3600 * 1000; // 3600 seconds * 1000 milliseconds
      setTimeout(clearLocalStorageAfter1Hour, oneHour);
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  const ProtectedRoute = ({ redirectPath = "/signin" }) => {
    const userData = JSON.parse(localStorage.getItem("_userData")) || {};
    const ACCESS_TOKEN = userData.accessToken;

    if (!ACCESS_TOKEN) {
      return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
  };

  return (
    <Router>
      <Routes>
        <Route exact path="/signin" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/forgot-password" element={<ForgotPassword/>} />
        <Route exact path="/forgot-password/sent/:email" element={<ForgetPasswordEmailSent/>} />
        <Route exact path="/reset-password/:token" element={<ResetPassword/>} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/player/:videoId" element={<Player />} />
          <Route path="/search/:title" element={<SearchResults/>} />
          <Route path="/Movies" element={<Movies/>} />
        </Route>
      </Routes>
    </Router>
  );
}
