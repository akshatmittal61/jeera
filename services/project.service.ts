import { emailTemplates, HTTP } from "@/constants";
import { ApiError } from "@/errors";
import { projectRepo, userRepo } from "@/repo";
import { CreateModel, IProject, IUser, Project } from "@/types";
import { getNonNullValue } from "@/utils";
import { sendBulkEmailTemplate } from "./email";

export class ProjectService {
	public static async getProjectDetails(
		projectId: string
	): Promise<IProject | null> {
		const project = await projectRepo.findById(projectId);
		return project;
	}
	public static async getProjectsForUser(
		userId: string
	): Promise<Array<IProject>> {
		return await projectRepo.fetchProjectsForUser(userId);
	}
	public static async getProjectByIdentifier(identifier: string) {
		return await projectRepo.fetchProjectByIdentifier(identifier);
	}
	public static async sendInvitationToJoin({
		project,
		userIds,
		invitedBy,
	}: {
		project: IProject;
		userIds: Array<string>;
		invitedBy: IUser;
	}) {
		const users = (await userRepo.findMultipleByIds(userIds)).filter(
			getNonNullValue
		) as Array<IUser>;
		return await sendBulkEmailTemplate(
			users.map((user) => user.email),
			`${invitedBy.name} has added you to ${project.title}`,
			emailTemplates.USER_ADDED_TO_PROJECT,
			{
				invitedBy,
				project,
			}
		);
	}
	public static async createProject(
		body: CreateModel<Project>,
		user: IUser
	): Promise<IProject> {
		// validate start and end date
		const start = body.start;
		const end = body.end;
		if (start && end) {
			if (new Date(start) >= new Date(end)) {
				throw new ApiError(
					HTTP.status.BAD_REQUEST,
					"Start date cannot be greater than end date"
				);
			}
		}

		// validate identifier
		// - should only contain caps alphabet
		// - length should be between 2 and 8
		// - should be unique
		const identifier = body.identifier;
		if (!/^[A-Z]{2,8}$/.test(identifier)) {
			throw new ApiError(
				HTTP.status.BAD_REQUEST,
				"Identifier should only contain caps alphabet and should be between 2 and 8"
			);
		}
		const foundProject =
			await ProjectService.getProjectByIdentifier(identifier);
		if (foundProject) {
			throw new ApiError(
				HTTP.status.CONFLICT,
				"Identifier already in use"
			);
		}

		// members management
		if (!body.members.includes(user.id)) {
			body.members.push(user.id);
		}
		if (body.members.length <= 1) {
			throw new ApiError(
				HTTP.status.BAD_REQUEST,
				"Project must have at least 2 members"
			);
		}

		const project = await projectRepo.create({
			...body,
			author: user.id,
		});
		ProjectService.sendInvitationToJoin({
			project,
			userIds: body.members,
			invitedBy: user,
		});
		return project;
	}
}
