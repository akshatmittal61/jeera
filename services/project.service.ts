import { HTTP } from "@/constants";
import { ApiError } from "@/errors";
import { projectRepo, userRepo } from "@/repo";
import { CreateModel, IProject, Project } from "@/types";

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
	public static async createProject(
		body: CreateModel<Project>,
		userId: string
	): Promise<IProject> {
		// validate start and end date
		const start = body.start;
		const end = body.end;
		if (start && end) {
			if (new Date(start) > new Date(end)) {
				throw new ApiError(
					HTTP.status.BAD_REQUEST,
					"Start date cannot be greater than end date"
				);
			}
		}

		// validate identifier
		// - should only contain caps alphabet
		// - length should be between 3 and 5
		// - should be unique
		const identifier = body.identifier;
		if (!/^[A-Z]{3,5}$/.test(identifier)) {
			throw new ApiError(
				HTTP.status.BAD_REQUEST,
				"Identifier should only contain caps alphabet and should be between 3 and 5"
			);
		}
		const foundProject = await projectRepo.findOne({ identifier });
		if (foundProject) {
			throw new ApiError(
				HTTP.status.CONFLICT,
				"Project with this identifier already exists"
			);
		}

		// validate owner
		const user = await userRepo.findById(userId);
		if (!user) {
			throw new ApiError(HTTP.status.NOT_FOUND, "User not found");
		}

		const project = await projectRepo.create({
			...body,
			owner: userId,
		});
		return project;
	}
}
