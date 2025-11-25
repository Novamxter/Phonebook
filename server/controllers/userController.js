import bcrypt from "bcrypt";
import User from "../models/UserSchema.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        error: "username you entered does not exists.",
        errorIn: "username",
      });
    }

    const passwordOk = await bcrypt.compare(password, user.password);
    if (!passwordOk) {
      return res.status(400).json({ error: "Invalid Password", errorIn: "password" });
    }

    const accessToken = await generateAccessToken(user);
    if(!accessToken) return res.status(400).json({error:"token not generated."})

    res.status(200).json({ user: user, accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message, error: err });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        error: "User already exists with this username",
        errorIn: "username",
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        error: "User already exists with this email",
        errorIn: "email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const accessToken = await generateAccessToken(newUser);
    if(!accessToken) return res.status(400).json({error:"token not generated."})

    res.status(200).json({ user: newUser, accessToken });
  } catch (err) {
    res.status(500).json({ message: err.message, error: err });
  }
};

function generateAccessToken(user) {
  return jwt.sign({_id:user._id,username:user.username,email:user.email}, process.env.ACCESS_SECRET, { expiresIn: "30m" });
}

