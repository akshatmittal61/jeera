export type CacheParameter = "USER";

export type T_USER_STATUS = "JOINED" | "INVITED";
export type T_USER_ROLE = "ADMIN" | "MEMBER" | "GUEST";
export type T_OTP_STATUS = "PENDING" | "EXPIRED";

export type T_EMAIL_TEMPLATE =
	| "OTP"
	| "NEW_USER_ONBOARDED"
	| "USER_INVITED"
	| "USER_ADDED_TO_GROUP";

export type GOOGLE_MAIL_SERVICE_KEYS = "email" | "password";
