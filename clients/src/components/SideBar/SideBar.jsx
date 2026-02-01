import React from "react";
import { useNavigate } from "react-router-dom";
import "./SideBar.css";
import toast from "react-hot-toast";
import api from "../../api";

function SideBar({ isOpen }) {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("user");
  const user = JSON.parse(userInfo);

  const handlLogout = async () => {
    try {
      await api.post("/logout");
      toast.success("logged out successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>name: {user.name}</h2>
        </div>
        <div className="sidebar-list">
          <ul>
            <li>
              <a onClick={() => navigate()}>Dashboard</a>
            </li>
            <li>
              <button onClick={() => navigate("/user/profile")}>Profile</button>
            </li>
            <li>
              <a onClick={() => navigate()}>Users</a>
            </li>
            <li>
              <a onClick={() => navigate()}>Products</a>
            </li>
            <li>
              <a onClick={() => navigate()}>Categories</a>
            </li>
          </ul>
          <button onClick={handlLogout}>Logout</button>
        </div>
      </div>
    </>
  );
}
export default SideBar;
