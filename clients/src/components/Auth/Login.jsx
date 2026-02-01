import React from "react";
import { useState } from "react";
import api from "../../api.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.jsx";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const role = user?.role;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.status !== 200) {
        toast.error(res.data.message);
      }

      const { token, user } = res.data;
      login(user, token);

      user.role === "admin"
        ? navigate("/admin/dashboard")
        : navigate("/user/dashboard"); //Role Based
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
