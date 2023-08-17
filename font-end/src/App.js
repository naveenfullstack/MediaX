import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "../src/App.css";
import PageNotFound from "../src/page/PageNotFound";

/* IMPORT COMPONENTS */
import Home from "../src/page/Home";
import Login from "./page/Login";
import SignUp from "./page/SignUp";

export default function App() {
  const [token, setToken] = useState(null);

  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => (token ? <Home /> : <Login setToken={setToken} />)}/>
        <Route exact path="/signin" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/dashboard" component={Home} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}
