import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, 
  description: { type: String },
  stock: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Book || mongoose.model("Book", BookSchema);