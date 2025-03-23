import {
	AuthMappingSchema,
	OtpSchema,
	ProjectSchema,
	SprintSchema,
	TaskSchema,
	UserSchema,
} from "@/schema";
import { AuthMapping, Otp, Project, Sprint, Task, User } from "@/types";
import { ModelFactory } from "./base";

export const UserModel = new ModelFactory<User>("User", UserSchema).model;
export const AuthMappingModel = new ModelFactory<AuthMapping>(
	"AuthMapping",
	AuthMappingSchema
).model;
export const OtpModel = new ModelFactory<Otp>("Otp", OtpSchema).model;
export const ProjectModel = new ModelFactory<Project>("Project", ProjectSchema)
	.model;
export const SprintModel = new ModelFactory<Sprint>("Sprint", SprintSchema)
	.model;
export const TaskModel = new ModelFactory<Task>("Task", TaskSchema).model;
