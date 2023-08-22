import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../src/App.css";

/* IMPORT COMPONENTS */
import Home from "./page/Home";
import Login from "./page/Login";
import SignUp from "./page/SignUp";
import PageNotFound from "../src/page/PageNotFound";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  // const [token, setToken] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <Fragment>
          <Routes>
            {/* <Route path="/" exact render={() => (token ? <Home /> : <Login setToken={setToken} />)}/> */}
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Home />} />
            </Route>
            <Route exact path="/signin" element={<Login/>} />
            <Route exact path="/signup" element={<SignUp/>} />
            <Route element={<PageNotFound/>} />
          </Routes>
        </Fragment>
      </Router>
    </AuthProvider>
  );
}
