import React from "react";
import Navbar from "./Layout/Navbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Navbar />
            <div className="flex-1 md:ml-64 pt-16 px-4 pb-4">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
