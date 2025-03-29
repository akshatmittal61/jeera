export type CacheParameter = "USER" | "PROJECT" | "SPRINT" | "TASK";
export type CacheKeyGenerator<T extends CacheParameter> = T extends "USER"
	? { token: string }
	: T extends "PROJECT" | "SPRINT" | "TASK"
		? { id: string }
		: never;

export type T_USER_STATUS = "JOINED" | "INVITED";
export type T_USER_ROLE = "ADMIN" | "MEMBER" | "GUEST";
export type T_OTP_STATUS = "PENDING" | "EXPIRED";
export type T_TASK_STATUS = "TODO" | "INPROGRESS" | "DONE" | "BACKLOG";
export type T_TASK_PRIORITY = "LOW" | "MEDIUM" | "HIGH" | "SEVERE";
export type T_TASK_TYPE = "BUG" | "FEATURE" | "TASK";

export type T_EMAIL_TEMPLATE =
	| "OTP"
	| "NEW_USER_ONBOARDED"
	| "USER_INVITED"
	| "USER_ADDED_TO_PROJECT";

export type GOOGLE_MAIL_SERVICE_KEYS = "email" | "password";
