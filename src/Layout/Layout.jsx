import React from "react";
import { Route, Routes } from "react-router";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Home from "../Pages/Home";
import Customers from "../Pages/Customers";
import Transactions from "../Pages/Transactions";

const Layout = () => {
  return (
    <div className="min-h-screen h-screen w-full fixed">
      <Navbar />
      {/* Content */}
      <div className="flex h-full">
        <Sidebar />
        <div className="bg-gray-200 w-full h-full lg:px-20 lg:pt-10 px-4 py-2 overflow-scroll mb-40">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Layout;
