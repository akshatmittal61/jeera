import { HTTP } from "@/constants";
import { Logger } from "@/log";
import { AuthService } from "@/services";
import { ApiController, ApiRequest, ApiResponse } from "@/types";
import {
	ApiFailure,
	ApiSuccess,
	genericParse,
	getNonEmptyString,
} from "@/utils";

export class ServerMiddleware {
	public static authenticatedRoute(next: ApiController): ApiController {
		return async (req: ApiRequest, res: ApiResponse) => {
			try {
				Logger.debug("Authenticating user", req.cookies);
				const accessToken = genericParse(
					getNonEmptyString,
					req.cookies.accessToken
				);
				const refreshToken = genericParse(
					getNonEmptyString,
					req.cookies.refreshToken
				);
				Logger.debug("Authenticating user tokens", {
					accessToken,
					refreshToken,
				});
				const authReponse = await AuthService.getAuthenticatedUser({
					accessToken,
					refreshToken,
				});
				if (!authReponse) {
					return new ApiFailure(res).send(
						HTTP.message.UNAUTHORIZED,
						HTTP.status.UNAUTHORIZED
					);
				}
				Logger.debug("Authenticated user", authReponse);
				const {
					user,
					accessToken: newAccessToken,
					refreshToken: newRefreshToken,
				} = authReponse;
				const cookies = AuthService.getUpdatedCookies(
					{ accessToken, refreshToken },
					{
						accessToken: newAccessToken,
						refreshToken: newRefreshToken,
					}
				);
				if (cookies.length > 0) {
					new ApiSuccess(res).cookies(cookies);
				}
				req.user = user;
				return next(req, res);
			} catch (error) {
				Logger.error(error);
				return new ApiFailure(res).send(
					HTTP.message.UNAUTHORIZED,
					HTTP.status.UNAUTHORIZED
				);
			}
		};
	}
	public static adminRoute(next: ApiController): ApiController {
		return async (req: ApiRequest, res: ApiResponse) => {
			try {
				const role = genericParse(getNonEmptyString, req.cookies.role);
				if (role !== "admin") {
					throw new Error("Not an admin");
				}
				return next(req, res);
			} catch (error) {
				Logger.error(error);
				return new ApiFailure(res).send(
					HTTP.message.FORBIDDEN,
					HTTP.status.FORBIDDEN
				);
			}
		};
	}
}
