import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import "./assets/css/sb-admin-2.min.css";
import "./assets/vendor/fontawesome-free/css/all.css";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import About from "./views/About";

export default function App() {
  const { message } = useSelector((state) => state);

  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
