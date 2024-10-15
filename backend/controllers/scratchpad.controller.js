import mongoose from "mongoose";
import Scratchpad from "../models/scratchpad.model.js";

export const getScratchpads = async (req, res) => {
  try {
    const scratchpads = await Scratchpad.find({});
    res.status(200).json({ success: true, data: scratchpads });
  } catch (error) {
    console.log("error in fetching scratchpads:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createScratchpad = async (req, res) => {
  const scratchpad = req.body; // user will send this data

  if (!scratchpad.name || !scratchpad.detail || !scratchpad.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newScratchpad = new Scratchpad(scratchpad);

  try {
    await newScratchpad.save();
    res.status(201).json({ success: true, data: newScratchpad });
  } catch (error) {
    console.error("Error in Create scratchpad:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateScratchpad = async (req, res) => {
  const { id } = req.params;

  const scratchpad = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid scratchpad Id" });
  }

  try {
    const updatedScratchpad = await Scratchpad.findByIdAndUpdate(
      id,
      scratchpad,
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedScratchpad });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteScratchpad = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid scratchpad Id" });
  }

  try {
    await Scratchpad.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Scratchpad deleted" });
  } catch (error) {
    console.log("error in deleting Scratchpad:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
