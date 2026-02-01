import React, { useState } from "react";
import api from "../../api";
import toast from "react-hot-toast";
import { useAuth } from "../Context/AuthContext.jsx";
function Profile() {
  const { user } = useAuth();
  const [changePassword, setChangePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/user/password/${user._id}`, changePassword);
      if (res.status !== 200) {
        toast.error(res.data.message || "password did not change ");
      }
      toast.success("password changed successfully");
      setChangePassword({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <h1>My Profile</h1>
      <div>
        <p>Name: {user?.name}</p>
        {/* the (?) is to tell the data flow that the data may be null */}
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
      </div>
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          name="password"
          placeholder="enter old paasword"
          value={changePassword.oldPassword}
          onChange={(e) =>
            setChangePassword({
              ...changePassword,
              oldPassword: e.target.value,
            })
          }
        />
        <br />
        <input
          type="password"
          name="newPassword"
          placeholder="enter new paasword"
          value={changePassword.newPassword}
          onChange={(e) =>
            setChangePassword({
              ...changePassword,
              newPassword: e.target.value,
            })
          }
        />
        <br />
        <input
          type="password"
          name="confirmnewPassword"
          placeholder="enter confirm new paasword"
          value={changePassword.confirmNewPassword}
          onChange={(e) =>
            setChangePassword({
              ...changePassword,
              confirmNewPassword: e.target.value,
            })
          }
        />
        <br />
        <button type="submit">Save</button>
      </form>
    </>
  );
}

export default Profile;
