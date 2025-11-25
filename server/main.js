import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import contactRoutes from "./routes/contactRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import User from "./models/UserSchema.js";
import Contact from "./models/ContactSchema.js";

dotenv.config();

const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://social-post-app-full-stack.vercel.app"
    : "http://localhost:5173";

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: allowedOrigin, // exact origin of your frontend
    credentials: true, // allow cookies/auth headers
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Database..");
  })
  .catch((err) => console.error(err));

app.use("/api", userRoutes);
app.use("/api/contacts", contactRoutes);

//To delete all the users :
// await User.deleteMany({});

//To delete all the Contacts :
// await Contact.deleteMany({})

//await Contact.syncIndexes();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
