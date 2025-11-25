import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Compound unique index: userId + phone
contactSchema.index({ userId: 1, phone: 1 }, { unique: true });

export default mongoose.model("Contact", contactSchema);
