import { AuthMappingSchema, UserSchema } from "@/schema";
import { AuthMapping, User } from "@/types";
import { ModelFactory } from "./base";

export const UserModel = new ModelFactory<User>("User", UserSchema).model;
export const AuthMappingModel = new ModelFactory<AuthMapping>(
	"AuthMapping",
	AuthMappingSchema
).model;
