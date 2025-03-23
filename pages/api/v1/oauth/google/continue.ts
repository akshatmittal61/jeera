import { AuthController } from "@/controllers";
import { ApiRoute } from "@/server";

const apiRouter = new ApiRoute(
	{ POST: AuthController.continueOAuthWithGoogle },
	{ db: true }
);
const handler = apiRouter.getHandler();

export default handler;
