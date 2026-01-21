import mongoose, { Schema, model, models, Model } from "mongoose";

// Define an interface for your Book for better TypeScript support
export interface IBook {
  title: string;
  author: string;
  price: number;
  description?: string;
  category: string;
  imageUrl?: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String, required: true },
    imageUrl: { type: String },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// This 'models.Book || model...' check is CRITICAL for Next.js/Vercel
const Book = (models.Book as Model<IBook>) || model<IBook>("Book", BookSchema);

export default Book;