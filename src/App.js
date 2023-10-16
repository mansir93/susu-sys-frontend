import React from "react";
import { Route, Routes } from "react-router";
import Login from "./Pages/Login";
// import Signup from "./Pages/Signup";


import "./App.css";
import Layout from "./Layout/Layout";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
      </Routes>
    </div>
  );
}

export default App;
