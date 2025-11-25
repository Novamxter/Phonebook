import React, { useState, useEffect } from "react";
import { fetchContacts } from "../services/api.mjs";
import Navbar from "../components/Navbar";
import Form from "../components/Form";
import RenderData from "../components/RenderData";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { accessToken, isLogout } = useAuth();
  const [contacts, setContacts] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    if (!accessToken) return;
    const res = await fetchContacts(accessToken);
    setContacts(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!isLogout && !accessToken) {
      if (!window.alertShown) {
        alert("Token Required! Login again");
        navigate("/login");
        window.alertShown = true;
      }
    }
  }, [isLogout, accessToken]);

  return (
    <>
      {!isLogout && (
        <div className="flex flex-col items-center w-full mt-[80px]">
          <h1 className="text-3xl font-bold">Welcome {user.username}!</h1>
          <Form
            onContactAdded={(newContact) =>
              setContacts((prev) => [...prev, newContact])
            }
          />
          {contacts.length === 0 && <div>No Contacts Yet</div>}
          {contacts && contacts.length !== 0 && (
            <RenderData contacts={contacts} onContactDeleted={fetchData} />
          )}
        </div>
      )}
    </>
  );
}
