import { TASK_PRIORITY, TASK_STATUS, TASK_TYPE } from "@/constants";
import mongoose from "mongoose";

export const TaskSchema = {
	title: {
		type: String,
		required: true,
	},
	identifier: {
		type: String,
		required: true,
		unique: true,
	},
	status: {
		type: String,
		required: true,
		enum: Object.values(TASK_STATUS),
		default: TASK_STATUS.TODO,
	},
	priority: {
		type: String,
		required: true,
		enum: Object.values(TASK_PRIORITY),
		default: TASK_PRIORITY.LOW,
	},
	type: {
		type: String,
		required: true,
		enum: Object.values(TASK_TYPE),
		default: TASK_TYPE.TASK,
	},
	storyPoint: {
		type: Number,
	},
	description: {
		type: String,
	},
	count: {
		type: Number,
		required: true,
		default: 0,
	},
	assignee: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	reportee: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	sprint: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Sprint",
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project",
		required: true,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	start: {
		type: Date,
	},
	end: {
		type: Date,
	},
};
