import React, { useState } from "react";
import { useSelector } from "react-redux";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const { message } = useSelector((state) => state);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. &nbsp; {message}
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;