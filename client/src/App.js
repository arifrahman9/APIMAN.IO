import React from "react"
import { Switch, Route } from "react-router-dom"
import "./assets/css/sb-admin-2.min.css"
import PrivateLogin from "./navigation-guards/PrivateLogin"
import PrivatePage from "./navigation-guards/PrivatePage"
import Login from "./views/Login"
import Register from "./views/Register"
import ProfilePage from "./views/ProfilePage"
import ForgotPassword from "./views/ForgotPassword"
import ChangePassword from "./views/ChangePassword"
import HomePage from "./views/HomePage"
import LandingPage from "./views/Landing/LandingPage"

export default function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <PrivateLogin path="/login">
          <Login />
        </PrivateLogin>
        <PrivateLogin path="/register">
          <Register />
        </PrivateLogin>
        <PrivateLogin path="/forgot-password">
          <ForgotPassword />
        </PrivateLogin>
        <PrivateLogin path="/reset/:token">
          <ChangePassword />
        </PrivateLogin>
        <PrivatePage path="/profile">
          <ProfilePage />
        </PrivatePage>
        <PrivatePage path="/homepage">
          <HomePage />
        </PrivatePage>
      </Switch>
    </>
  )
}
