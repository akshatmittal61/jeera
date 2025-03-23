import mongoose from "mongoose";

export const ProjectSchema = {
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	identifier: {
		type: String,
		required: true,
		unique: true,
	},
	start: {
		type: Date,
	},
	end: {
		type: Date,
	},
};
