import React, { useState } from "react";
import { addContact } from "../services/api.mjs";

export default function Form({ onContactAdded }) {
  const [formData, setData] = useState({ name: "", email: "", phone: "" });
  const user = JSON.parse(localStorage.getItem("user"));

  const handleData = (e) => {
    setData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user || !user._id) {
        alert("You must be logged in first");
        return;
      }
      const res = await addContact({ ...formData, userId: user._id });
      console.log("front", res);
      onContactAdded(res.data);
      setData({ name: "", phone: "", email: "" });
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert(err.response.data.error);
        setData((prev) => ({ ...prev, phone: "" }));
      } else {
        console.error("Error adding contact:", err);
      }
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-gray-100 max-w-[450px] p-8 rounded-2xl mt-5"
      >
        <h1 className="self-center font-bold text-[22px] mb-6">
          Add New Contact
        </h1>
        <div className="input-container">
          <label htmlFor="name">Enter Name: </label>
          <input
            name="name"
            id="name"
            type="text"
            value={formData.name}
            onChange={handleData}
            className="main-input"
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Enter Email: </label>
          <input
            name="email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleData}
            className="main-input"
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="phone">Enter Phone Number: </label>
          <input
            name="phone"
            id="phone"
            type="text"
            value={formData.phone}
            onChange={handleData}
            className="main-input"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-[10px] w-[80px] h-[36px] self-center mt-6"
        >
          Submit
        </button>
      </form>
    </>
  );
}
