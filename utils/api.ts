import { HTTP } from "@/constants";
import { ApiResponse, Cookie } from "@/types";

export const ApiSuccess = (res: ApiResponse) => {
	return {
		send: (
			data?: any,
			message: string = HTTP.message.SUCCESS,
			status: number = HTTP.status.SUCCESS
		) => {
			res.status(status).json({ message, data });
		},
	};
};

export const ApiFailure = (res: ApiResponse) => {
	return {
		send: (
			message: string = HTTP.message.ERROR,
			status: number = HTTP.status.INTERNAL_SERVER_ERROR
		) => {
			res.status(status).json({ message });
		},
	};
};

export const ApiCookies = (res: ApiResponse) => {
	return {
		set: (cookies: Array<Cookie>) => {
			res.setHeader(
				"Set-Cookie",
				cookies.map(
					(cookie) =>
						`${cookie.name}=${cookie.value}; HttpOnly; Max-Age=${cookie.maxAge}; Path=/; SameSite=None; Secure=true;`
				)
			);
		},
	};
};
