import mongoose, { Schema, model, models } from "mongoose";

const CartSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        quantity: { 
          type: Number, 
          required: true, 
          default: 1,
          min: 1 
        },
      },
    ],
  },
  { timestamps: true }
);

export default models.Cart || model("Cart", CartSchema);