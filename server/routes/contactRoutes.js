import express from "express";
import { getContacts, addContact, deleteContact } from "../controllers/contactController.js";
import { verifyPhoneNumber } from '../middleware/verifyPhoneNumber.js'
const router = express.Router()

router.get("/",getContacts)
router.post("/", verifyPhoneNumber, addContact)
router.delete("/:id", deleteContact)

export default router