import React from "react";
import Navbar from "./Layout/Navbar/Navbar";
import Footer from "./Layout/Footer/footer";
import { Outlet } from "react-router-dom";
import FloatingSocialMenu from "../../../utils/FloatingSocialMenu";

const Agriculture = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow mt-24">
        <Outlet />
        <FloatingSocialMenu />
      </main>
      <Footer />
    </div>
  );
};

export default Agriculture;
