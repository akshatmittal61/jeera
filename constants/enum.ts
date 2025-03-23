import {
	T_API_METHODS,
	T_EMAIL_TEMPLATE,
	T_OTP_STATUS,
	T_USER_ROLE,
	T_USER_STATUS,
} from "@/types";
import { getEnumeration } from "@/utils";

export const USER_ROLE = getEnumeration<T_USER_ROLE>([
	"ADMIN",
	"GUEST",
	"MEMBER",
]);

export const USER_STATUS = getEnumeration<T_USER_STATUS>(["INVITED", "JOINED"]);

export const OTP_STATUS = getEnumeration<T_OTP_STATUS>(["PENDING", "EXPIRED"]);

export const apiMethods = getEnumeration<T_API_METHODS>([
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
]);

export const emailTemplates = getEnumeration<T_EMAIL_TEMPLATE>([
	"OTP",
	"NEW_USER_ONBOARDED",
	"USER_INVITED",
	"USER_ADDED_TO_GROUP",
]);

const message = Object.freeze({
	SUCCESS: "Success",
	ERROR: "Error",
	NOT_FOUND: "Not Found",
	BAD_REQUEST: "Bad Request",
	UNAUTHORIZED: "Please login to continue",
	FORBIDDEN: "You do not have permission to perform this action",
	INTERNAL_SERVER_ERROR: "Internal Server Error",
	SERVICE_UNAVAILABLE: "Service Unavailable",
});

const status = Object.freeze({
	SUCCESS: 200,
	CREATED: 201,
	REMOVED: 204,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	METHOD_NOT_ALLOWED: 405,
	GONE: 410,
	CONFLICT: 409,
	INTERNAL_SERVER_ERROR: 500,
	SERVICE_UNAVAILABLE: 503,
});

export const HTTP = Object.freeze({ message, status });
