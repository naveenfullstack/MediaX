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
import PageNotFound from "../src/page/PageNotFound";


export default function App() {
  // Initialize userData to an empty object to avoid undefined errors
  const userData = JSON.parse(localStorage.getItem("_userData")) || {};
  const ACCESS_TOKEN = userData.accessToken;
  //const USER_KEY = userData.user_key;
  const REFRESH_TOKEN = userData.refreshToken;

  //const [user, setUser] = useState(false);

  useEffect(() => {
    if (ACCESS_TOKEN) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${ACCESS_TOKEN}`;
      //axios.defaults.headers.common["User-Key"] = `${USER_KEY}`;
      axios.defaults.headers.common["User-Rt"] = `${REFRESH_TOKEN}`;
      document.cookie = `at=${ACCESS_TOKEN}`;
      //setUser(true);
    }
  }, [ACCESS_TOKEN, REFRESH_TOKEN]);

  const ProtectedRoute = ({ redirectPath = "/signin" }) => {
    const userData = JSON.parse(localStorage.getItem("_userData")) || {};
    const ACCESS_TOKEN = userData.accessToken;

    if (!ACCESS_TOKEN) {
      //console.log("no token");
      return <Navigate to={redirectPath} replace />;
    } else {
      //console.log("has token");
    }

    return <Outlet />;
  };

  
  return (
    <Router>
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/signin" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
