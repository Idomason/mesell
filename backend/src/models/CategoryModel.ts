import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Category must have a name"],
      trim: true,
    },
  },
  { timestamps: true },
);

export const Category = model("Category", categorySchema);
