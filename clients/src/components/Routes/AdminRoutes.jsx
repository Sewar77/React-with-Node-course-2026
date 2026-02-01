import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

function AdminRoutes() {
  const { user, loading } = useAuth();
  const role = user?.role;
  if (loading) {
    <div>Loading...</div>;
  }

  if (role !== "admin")
    return (
      <>
        {toast.error("Admin Access Required!")}
        {<Navigate to="/login" />}
      </>
    );

  return <Outlet />;
}

export default AdminRoutes;
