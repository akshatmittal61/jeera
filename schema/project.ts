import { fallbackAssets } from "@/constants";
import mongoose from "mongoose";

export const ProjectSchema = {
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	leader: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
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
	members: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	icon: {
		type: String,
		default: fallbackAssets.projectIcon,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
};
