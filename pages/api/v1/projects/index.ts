import { ProjectController } from "@/controllers";
import { ApiRoute } from "@/server";

const apiRoute = new ApiRoute(
	{ POST: ProjectController.createProject },
	{ auth: true }
);

const handler = apiRoute.getHandler();

export default handler;
