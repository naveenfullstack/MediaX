import React from "react";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import "../src/App.css";
import PageNotFound from "../src/page/PageNotFound";

/* IMPORT COMPONENTS */
import Home from "../src/page/Home";
import Login from "./page/Login";
import SignUp from "./page/SignUp";

export default function App() {
  // const [token, setToken] = useState(null);

  return (
    <Router basename="https://naveenportfolio.site">
      <Routes>
        {/* <Route path="/" exact render={() => (token ? <Home /> : <Login setToken={setToken} />)}/> */}
        <Route path="/" element={<Home />} extend />
        <Route path="/signin" element={<Login />} extend />
        <Route path="/signup" element={<SignUp />} extend />
        <Route component={PageNotFound} />
      </Routes>
    </Router>
  );
}
