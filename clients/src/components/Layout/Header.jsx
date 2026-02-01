import React, { use } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext.jsx";
function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handlLogout = async () => {
    try {
      await api.post("/logout");
      toast.success("logged out successfully");
      logout();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <header className="header">
        <div>
          <button onClick={() => navigate("/admin/dashboard")}>Home</button>
        </div>
        <div>
          {" "}
          <button onClick={() => navigate("/admin/dashboard/users")}>
            Users
          </button>
        </div>
        <div>
          {" "}
          <button onClick={() => navigate("/admin/dashboard/products")}>
            Products
          </button>
        </div>
        <div>
          {" "}
          <button onClick={() => navigate("/admin/dashboard/categories")}>
            Categories
          </button>
        </div>
        <div>
          {" "}
          <button onClick={() => navigate("/about")}>About</button>
        </div>
        <div>
          <button onClick={handlLogout}>Logout</button>
        </div>
      </header>
    </>
  );
}
export default Header;
