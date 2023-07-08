import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import Home from "./Home";
import DashPage from "./dashPage";
import AuthPage from "./AuthPage";


function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
  
    useEffect(() => {
      WebFont.load({
        google: {
          families: ["Roboto", "Droid Sans", "Chilanka"],
        },
      });
  
      store.dispatch(loadUser());
    }, []);
  
    window.addEventListener("contextmenu", (e) => e.preventDefault());
  
    return (
        <Router>
        {/* <Header /> */}
        <Routes>
  
  
        <Route exact path="/" element={<Home/>} />
          <Route exact path="/dashboard" element={<DashPage/>} />
          <Route exact path="/login" element={<AuthPage />} />
        </Routes>
      </Router>
    );
  }
  
  export default App;
  