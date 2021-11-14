import React from "react";
import { Switch, Route } from "react-router-dom";
import "./assets/css/sb-admin-2.min.css";
import PrivateLogin from "./navigation-guards/PrivateLogin";
import PrivatePage from "./navigation-guards/PrivatePage";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";

import ProfilePage from "./views/ProfilePage";
import ForgotPassword from "./views/ForgotPassword";
import ChangePassword from "./views/ChangePassword";


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
        <PrivateLogin path="/forgot-password">
          <ForgotPassword />
        </PrivateLogin>
        <PrivateLogin path="/change-password">
          <ChangePassword />
        </PrivateLogin>
        <PrivatePage path="/profile">
          <ProfilePage />
        </PrivatePage>
        <PrivatePage path="/">
          <Home />
        </PrivatePage>
      </Switch>
      {/* //       <Routes>
//         <Route exact path="/login" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/change-password" element={<ChangePassword />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/profile" element={<ProfilePage />} />
//         <Route path="/" element={<Home />} />
//       </Routes> */}

    </>
  );
}
