import { AuthApi } from "@/api";
import { Cache } from "@/cache";
import { cacheParameter } from "@/constants";
import { ServerSideAuthInterceptor } from "@/types";

export const authRouterInterceptor: ServerSideAuthInterceptor = async (
	context: any,
	{ onLoggedInAndNotOnboarded, onLoggedInAndOnboarded, onLoggedOut }
) => {
	const { req } = context;
	const cookies = req.cookies;
	if (!cookies.accessToken || !cookies.refreshToken) {
		return onLoggedOut();
	}
	try {
		const headers = { cookie: req.headers.cookie };
		const { data: user } = await Cache.fetch(
			Cache.getKey(cacheParameter.USER, { token: cookies.accessToken }),
			() => AuthApi.verifyUserIfLoggedIn(headers)
		);
		if (user.name) {
			return onLoggedInAndOnboarded(user, headers);
		} else {
			return onLoggedInAndNotOnboarded(user, headers);
		}
	} catch (error: any) {
		return onLoggedOut();
	}
};
