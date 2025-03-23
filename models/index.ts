import { AuthMappingSchema, OtpSchema, UserSchema } from "@/schema";
import { AuthMapping, Otp, User } from "@/types";
import { ModelFactory } from "./base";

export const UserModel = new ModelFactory<User>("User", UserSchema).model;
export const AuthMappingModel = new ModelFactory<AuthMapping>(
	"AuthMapping",
	AuthMappingSchema
).model;
export const OtpModel = new ModelFactory<Otp>("Otp", OtpSchema).model;
