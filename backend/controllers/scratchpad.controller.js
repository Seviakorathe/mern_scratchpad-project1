import mongoose from "mongoose";
import ScratchPad from "../models/scratchpad.model.js";

export const getScratchPads = async (req, res) => {
	try {
		const scratchPads = await ScratchPad.find({});
		res.status(200).json({ success: true, data: scratchPads });
	} catch (error) {
		console.log("error in fetching scratchpads:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createScratchPad = async (req, res) => {
	const scratchPad = req.body; // user will send this data

	if (!scratchPad.name || !scratchPad.detail) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newScratchPad = new ScratchPad(scratchPad);

	try {
		await newScratchPad.save();
		res.status(201).json({ success: true, data: newScratchPad });
	} catch (error) {
		console.error("Error in Create scratchpad:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateScratchPad = async (req, res) => {
	const { id } = req.params;

	const scratchpad = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid scratchpad Id" });
	}

	try {
		const updatedScratchPad = await ScratchPad.findByIdAndUpdate(id, scratchPad, { new: true });
		res.status(200).json({ success: true, data: updatedScratchPad });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteScratchPad = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid scratchpad Id" });
	}

	try {
		await ScratchPad.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Scratchpad deleted" });
	} catch (error) {
		console.log("error in deleting Scratchpad:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
