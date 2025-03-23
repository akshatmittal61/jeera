import { UserController } from "@/controllers";
import { ApiRoute } from "@/server";

const apiRouter = new ApiRoute(
	{ POST: UserController.getUserByEmail },
	{ db: true }
);
const handler = apiRouter.getHandler();

export default handler;
