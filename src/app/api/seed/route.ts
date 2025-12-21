import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Book from "@/models/Book";

const SAMPLE_BOOKS = [
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 24.99,
    image: "https://covers.openlibrary.org/b/id/10313322-L.jpg",
    description: "Between life and death there is a library, and within that library, the shelves go on forever."
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    price: 18.50,
    image: "https://covers.openlibrary.org/b/id/12885407-L.jpg",
    description: "A revolutionary system to get 1 percent better every day."
  },
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 29.99,
    image: "https://covers.openlibrary.org/b/id/10631671-L.jpg",
    description: "A lone astronaut must save the earth from an interstellar threat."
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    price: 15.99,
    image: "https://covers.openlibrary.org/b/id/11149419-L.jpg",
    description: "The epic masterpiece of science fiction and political intrigue."
  }
];

export async function GET() {
  try {
    await connectDB();
    await Book.deleteMany({}); 
    await Book.insertMany(SAMPLE_BOOKS);
    return NextResponse.json({ message: "Archive updated with stable imagery." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}