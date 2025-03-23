import { HTTP } from "@/constants";
import { Logger } from "@/log";
import { AuthService, OAuthService, OtpService } from "@/services";
import { ApiRequest, ApiResponse } from "@/types";
import {
	ApiCookies,
	ApiFailure,
	ApiSuccess,
	genericParse,
	getNonEmptyString,
} from "@/utils";

export class AuthController {
	public static async verifyOAuthSignIn(req: ApiRequest, res: ApiResponse) {
		const code = genericParse(getNonEmptyString, req.body.code);
		const data = await OAuthService.verifyOAuthSignIn(code);
		return ApiSuccess(res).send(data);
	}
	public static async continueOAuthWithGoogle(
		req: ApiRequest,
		res: ApiResponse
	) {
		const validatorToken = genericParse(getNonEmptyString, req.body.token);
		const { user, cookies } =
			await OAuthService.continueOAuthWithGoogle(validatorToken);
		Logger.debug("User logged in with Google", user, cookies);
		if (cookies.length > 0) {
			ApiCookies(res).set(cookies);
		}
		return ApiSuccess(res).send(user);
	}
	public static async requestOtp(req: ApiRequest, res: ApiResponse) {
		const email = getNonEmptyString(req.body.email);
		await OtpService.requestOtpWithEmail(email);
		return ApiSuccess(res).send(null, "OTP sent successfully");
	}
	public static async verifyOtp(req: ApiRequest, res: ApiResponse) {
		const email = getNonEmptyString(req.body.email);
		const otp = genericParse(getNonEmptyString, req.body.otp);
		Logger.debug("Verifying OTP", { email, otp });
		const { cookies, user, isNew } = await OtpService.verifyOtpWithEmail(
			email,
			otp
		);
		if (cookies.length > 0) {
			ApiCookies(res).set(cookies);
		}
		const responseStatus = isNew
			? HTTP.status.CREATED
			: HTTP.status.SUCCESS;
		return ApiSuccess(res).send(user, HTTP.message.SUCCESS, responseStatus);
	}
	public static async verifyLoggedInUser(req: ApiRequest, res: ApiResponse) {
		const user = req.user;
		if (!user) {
			return ApiFailure(res).send("Please login to continue");
		}
		return ApiSuccess(res).send(user);
	}
	public static async logout(_: ApiRequest, res: ApiResponse) {
		const cookies = AuthService.getCookies({
			accessToken: null,
			refreshToken: null,
			logout: true,
		});
		if (cookies.length > 0) {
			ApiCookies(res).set(cookies);
		}
		return ApiSuccess(res).send();
	}
}
