import React, { useState } from "react";
import { userLogin } from "../services/api.mjs";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const { saveToken, setIsLogout} = useAuth();

  const handleData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await userLogin(user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      saveToken(res.data.accessToken)
      setIsLogout(false)
      navigate("/home");
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert(err.response.data.error);
        if (err.response.data.errorIn === "username") {
          setUser((prev) => ({ ...prev, username: "" }));
        } else if (err.response.data.errorIn === "password") {
          setUser((prev) => ({ ...prev, password: "" }));
        }
      } else {
        console.error("Error in Login:", err);
      }
    }
  };
  return (
    <>
      <div className="h-[100vh] flex flex-col items-center justify-center">
        <form
          className="flex flex-col justify-center items-between bg-gray-100 p-8 max-w-[450px] gap-3 rounded-2xl"
          onSubmit={handleLogin}
        >
          <h1 className="text-2xl font-bold self-center mb-5">Login</h1>
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
            <label htmlFor="password">Password: </label>
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
            Login
          </button>
        </form>

        <p className="mt-2">
          Don’t have an account yet?{" "}
          <a href="/register" className="text-blue-400 underline">
            Register now!
          </a>
        </p>
      </div>
    </>
  );
}

// For demo, I’m storing accessToken in localStorage. In a real-world setup, accessToken would be short-lived, and refreshToken would be stored in an HttpOnly cookie for silent re-authentication.