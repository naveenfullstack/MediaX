import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/App.css";

/* IMPORT COMPONENTS */
import Home from "./page/Home";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import PageNotFound from "../src/page/PageNotFound";

export default function App() {
  // const [token, setToken] = useState(null);

  return (
    <Router>
      <Routes>
        {/* <Route path="/" exact render={() => (token ? <Home /> : <Login setToken={setToken} />)}/> */}
        <Route exact path="/" Component={Home} extend />
        <Route exact path="/signin" Component={Login} extend />
        <Route exact path="/signup" Component={SignUp} extend />
        <Route Component={PageNotFound} />
      </Routes>
    </Router>
  );
}
