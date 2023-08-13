import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "../src/App.css";
import PageNotFound from "../src/page/PageNotFound";

/* IMPORT COMPORNENTS */
import Home from "../src/page/Home";
import Login from "./page/Login";
import SignUp from "./page/SignUp";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} extend/>
        <Route exact path="/signin" component={Login} extend/>
        <Route exact path="/signup" component={SignUp} extend/>
        <Route component={PageNotFound} extend/>
      </Switch>
    </Router>
  );
}
