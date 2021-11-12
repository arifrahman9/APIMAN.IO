import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import "./assets/css/sb-admin-2.min.css";
import PrivateLogin from "./navigation-guards/PrivateLogin";
import PrivatePage from "./navigation-guards/PrivatePage";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Profile from "./views/Profile";

export default function App() {
  return (
    <>
      <Switch>
        <PrivateLogin exact path="/login">
          <Login />
        </PrivateLogin>
        <PrivateLogin path="/register">
          <Register />
        </PrivateLogin>
        <PrivatePage path="/profile">
          <Profile />
        </PrivatePage>
        <PrivatePage path="/">
          <Home />
        </PrivatePage>
      </Switch>
    </>
  );
}
