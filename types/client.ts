import { AuthMapping, Project, Sprint, Task, User } from "./models";

export type IUser = User;
export type IAuthMapping = Omit<AuthMapping, "user"> & { user: IUser | null };
export type IProject = Omit<Project, "owner"> & { owner: IUser };
export type ISprint = Omit<Sprint, "leader" | "project"> & {
	leader: IUser;
	project: IProject;
};
export type ITask = Omit<
	Task,
	"createdBy" | "assignee" | "reportee" | "sprint" | "project"
> & {
	assignee: IUser | null;
	reportee: IUser | null;
	sprint: ISprint | null;
	project: IProject;
	createdBy: IUser;
};
