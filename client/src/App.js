import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./assets/css/sb-admin-2.min.css";
import "./assets/vendor/fontawesome-free/css/all.css";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import ProfilePage from "./views/ProfilePage";
import ForgotPassword from "./views/ForgotPassword";

export default function App() {
  const { message } = useSelector((state) => state);

  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
