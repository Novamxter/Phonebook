import Contact from "../models/ContactSchema.js";
import jwt from "jsonwebtoken";

export const getContacts = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({error:"Token Required"});

    jwt.verify(token, process.env.ACCESS_SECRET, async (err, user) => {
      if (err) return res.status(403).json(err);

      const id = user._id
      //const id = req.params.id;

      const contacts = await Contact.find({ userId: id });
      if (contacts.length === 0) {
        return res.status(200).json({ noContact: true });
      }
      res.status(200).json(contacts);
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const addContact = async (req, res) => {
  try {
    const { name, phone, email, userId } = req.body;
    const existingContact = await Contact.findOne({ phone, userId });

    if (existingContact) {
      return res.status(400).json({
        error: "This phone number already exists in your contacts.",
      });
    }

    const newContact = new Contact({ name, phone, email, userId });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact Deleted" });
  } catch (e) {
    console.error("Server Error: ", e);
  }
};
