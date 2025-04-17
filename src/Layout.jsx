// Layout.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import NavbarCmp from "./components/Navbar";

const Layout = () => {
  return (
    <div>
      <NavbarCmp />
      <Outlet /> {/* This is where nested routes render */}
    </div>
  );
};

export default Layout;
