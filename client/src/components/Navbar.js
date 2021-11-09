import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <Link to="/">Home</Link>
      &nbsp;<Link to="/about">About</Link>
    </>
  );
}
