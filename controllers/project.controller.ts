import { ProjectService } from "@/services";
import {
	ApiRequest,
	ApiResponse,
	CreateModel,
	IProject,
	IUser,
	Project,
} from "@/types";
import {
	ApiSuccess,
	genericParse,
	getArray,
	getNonEmptyString,
	getNonNullValue,
	safeParse,
} from "@/utils";

export class ProjectController {
	public static async createProject(req: ApiRequest, res: ApiResponse) {
		const user = genericParse(getNonNullValue<IUser>, req.user);
		const title = genericParse(getNonEmptyString, req.body.title);
		const identifier = genericParse(getNonEmptyString, req.body.identifier);
		const leader = safeParse(getNonEmptyString, req.body.leader);
		const description = safeParse(getNonEmptyString, req.body.description);
		const start = safeParse(getNonEmptyString, req.body.start);
		const end = safeParse(getNonEmptyString, req.body.end);
		const members = genericParse(getArray<string>, req.body.members);
		const icon = safeParse(getNonEmptyString, req.body.icon);
		const payload: CreateModel<Project> = {
			title,
			identifier,
			author: user.id,
			members: members,
		};
		if (leader) payload.leader = leader;
		if (description) payload.description = description;
		if (start) payload.start = start;
		if (end) payload.end = end;
		if (icon) payload.icon = icon;
		const project = await ProjectService.createProject(payload, user);
		return new ApiSuccess<IProject>(res).send(project);
	}
}
