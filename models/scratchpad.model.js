import mongoose from "mongoose";

const scratchPadSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		detail: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);

const Product = mongoose.model("ScratchPad", scratchPadSchema);

export default Product;
