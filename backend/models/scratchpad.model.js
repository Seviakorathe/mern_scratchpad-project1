import mongoose from "mongoose";

const scratchpadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

const Scratchpad = mongoose.model("Scratchpad", scratchpadSchema);

export default Scratchpad;
