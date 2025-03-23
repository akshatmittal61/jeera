import { AuthController } from "@/controllers";
import { ApiRoute } from "@/server";

const apiRouter = new ApiRoute(
	{ GET: AuthController.verifyLoggedInUser },
	{ db: true, auth: true }
);
const handler = apiRouter.getHandler();

export default handler;
