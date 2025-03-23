import mongoose from "mongoose";

export const SprintSchema = {
	title: {
		type: String,
		required: true,
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project",
		required: true,
	},
	start: {
		type: Date,
		required: true,
	},
	end: {
		type: Date,
		required: true,
	},
	count: {
		type: Number,
		required: true,
		default: 0,
	},
	meet: {
		type: String,
	},
	leader: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
};
