import React from "react";
import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";

const LayoutClient = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default LayoutClient;
