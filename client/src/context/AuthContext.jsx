import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });
  const [isLogout, setIsLogout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setAccessToken(savedToken);
  }, []);

  useEffect(() => {
    if (accessToken) {
      try {
        const { exp } = jwtDecode(accessToken); 
        const now = Date.now() / 1000;

        if (exp < now) {
          alert("Session expired. Please login again");
          handleLogout();
        } else {
          const timeout = setTimeout(() => {
            alert("Session expired. Please login again");
            handleLogout();
          }, (exp - now) * 1000);

          return () => clearTimeout(timeout);
        }
      } catch (e) {
        console.error("Invalid token", e);
        handleLogout();
      }
    }
  }, [accessToken]);

  const saveToken = (token) => {
    setAccessToken(token);
    localStorage.setItem("token", token);
  };

  const clearToken = () => {
    setAccessToken(null);
    localStorage.removeItem("token");
  };

  const handleLogout = () => {
    setIsLogout(true);
    navigate("/login");
    clearToken();
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        saveToken,
        clearToken,
        isLogout,
        setIsLogout,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
