import "./App.css";
import LandingHome from "./components/Home/LandingHome.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./components/Users/UserDashboard.jsx";
import Register from "./components/Auth/Register.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import DisplayUsers from "./components/Admin/Users/DsiplayUsers.jsx";
import DisplayCategories from "./components/Admin/Categories/DisplayCategories.jsx";
import DisplayProducts from "./components/Admin/Products/DisplayProducts.jsx";
import About from "./components/Shared/About.jsx";
import Profile from "./components/Profile/Profile.jsx";
import ProtectRoutes from "./components/Routes/ProtectRoutes.jsx";
import AdminRoutes from "./components/Routes/AdminRoutes.jsx";
import Cart from "./components/Cart/Cart.jsx";
function App() {
  return (
    <>
      <Toaster position="top-center" />
      {/* define routes */}

      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectRoutes />}>
            {/* Users Routes */}
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/user/cart" element={<Cart />} />
            {/* Admin Routes */}
            <Route element={<AdminRoutes />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route
                path="/admin/dashboard/products"
                element={<DisplayProducts />}
              />
              <Route
                path="/admin/dashboard/categories"
                element={<DisplayCategories />}
              />
              <Route path="/admin/dashboard/users" element={<DisplayUsers />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
