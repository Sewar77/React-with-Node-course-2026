import React, { useState } from "react";
import Header from "../Layout/Header.jsx";
import Footer from "../Layout/Footer.jsx";
import SideBar from "../SideBar/SideBar.jsx";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header />
      <div className="admin-layout">
        <SideBar isOpen={isSidebarOpen} />

        <div className="admin-content">
          <button onClick={toggleSideBar}>
            {isSidebarOpen ? "Hide" : "Show"}
          </button>

          <h1>Admin Dashboard</h1>
          <p>
            welcome admin, here where you can manage your platform. users,
            products and categories
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default AdminDashboard;
