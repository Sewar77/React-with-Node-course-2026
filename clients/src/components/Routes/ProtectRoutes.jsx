//to protect routes: user with no tokens not allowed!!

import React from "react";
import { useAuth } from "../Context/AuthContext.jsx";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";
function ProtectRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <>
        {toast.error("Please Login to continue!")}
        {<Navigate to="/login" />}
      </>
    );
  }
  return <Outlet />;
}

export default ProtectRoutes;
