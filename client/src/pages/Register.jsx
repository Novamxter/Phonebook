import React, { useState } from "react";
import { userRegister } from "../services/api.mjs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const {saveToken, setIsLogout} = useAuth()

  const handleData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await userRegister(user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      saveToken(res.data.accessToken)
      setIsLogout(false)
      navigate("/home");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert(err.response.data.error);
        if (err.response.data.errorIn === "username") {
          setUser((prev) => ({ ...prev, username: "" }));
        } else if (err.response.data.errorIn === "email") {
          setUser((prev) => ({ ...prev, email: "" }));
        }
      } else {
        console.error("Error in Registration:", err.message);
      }
    }
  };

  return (
    <>
      <div className="h-[100vh] flex flex-col items-center justify-center">
        <form
          className="flex flex-col justify-center items-between bg-gray-100 p-8 max-w-[450px] gap-3 rounded-2xl"
          onSubmit={handleRegister}
        >
          <h1 className="text-2xl font-bold self-center mb-5">Register</h1>
          <div className="input-container">
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              name="username"
              type="text"
              value={user.username}
              onChange={handleData}
              className="main-input"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              name="email"
              type="text"
              value={user.email}
              onChange={handleData}
              className="main-input"
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Set Password: </label>
            <input
              id="password"
              name="password"
              type="text"
              value={user.password}
              onChange={handleData}
              className="main-input"
              required
            />
          </div>
          <button
            type="submit"
            className="w-[100px] h-[36px] self-center bg-blue-500 rounded-[8px] text-white mt-6"
          >
            Register
          </button>
        </form>

        <p className="mt-2"><a href="/login" className="text-blue-400 underline">Login</a> to manage your saved contacts anytime.</p>
      </div>
    </>
  );
}
