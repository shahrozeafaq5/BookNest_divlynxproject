import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, 
  description: { type: String },
  stock: { type: Number, default: 0 },
  category: {
  type: String,
  required: true,
  enum: ["philosophy", "poetry", "history", "fiction", "essays"],
  index: true,
},
}, { timestamps: true });

export default mongoose.models.Book || mongoose.model("Book", BookSchema);