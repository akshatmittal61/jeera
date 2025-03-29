import { ProjectModel } from "@/models";
import {
	CreateModel,
	FilterQuery,
	IProject,
	IUser,
	Project,
	UpdateQuery,
} from "@/types";
import { getNonNullValue, getObjectFromMongoResponse } from "@/utils";
import { BaseRepo } from "./base";

class ProjectRepo extends BaseRepo<Project, IProject> {
	protected model = ProjectModel;
	public parser(input: Project | null): IProject | null {
		const res = super.parser(input);
		if (!res) return null;
		const user = getObjectFromMongoResponse<IUser>(res.author);
		if (user) {
			res.author = user;
		}
		const leader = getObjectFromMongoResponse<IUser>(res.leader);
		if (leader) {
			res.leader = leader;
		}
		const members = res.members
			.map(getObjectFromMongoResponse<IUser>)
			.filter((obj) => obj !== null);
		if (members) {
			res.members = members;
		}
		return res;
	}
	public async findOne(
		query: FilterQuery<Project>
	): Promise<IProject | null> {
		const res = await this.model
			.findOne<Project>(query)
			.populate("owner leader members");
		return this.parser(res);
	}
	public async findById(id: string): Promise<IProject | null> {
		try {
			const res = await this.model
				.findById<Project>(id)
				.populate("owner leader members");
			return this.parser(res);
		} catch (error: any) {
			if (error.kind === "ObjectId") return null;
			throw error;
		}
	}
	public async find(
		query: FilterQuery<Project>
	): Promise<Array<IProject> | null> {
		const res = await this.model
			.find<Project>(query)
			.populate("owner leader members");
		const parsedRes = res.map(this.parser).filter((obj) => obj != null);
		if (parsedRes.length === 0) return null;
		return parsedRes;
	}
	public async findAll(): Promise<Array<IProject>> {
		const res = await this.model
			.find<Project>()
			.populate("owner leader members")
			.sort({ createdAt: -1 });
		const parsedRes = res.map(this.parser).filter((obj) => obj != null);
		if (parsedRes.length > 0) return parsedRes;
		return [];
	}
	public async create(body: CreateModel<Project>): Promise<IProject> {
		const res = await this.model.create<CreateModel<Project>>(body);
		return getNonNullValue(
			this.parser(await res.populate("owner leader members"))
		);
	}
	public async update(
		query: FilterQuery<Project>,
		update: UpdateQuery<Project>
	): Promise<IProject | null> {
		const filter = query.id ? { _id: query.id } : query;
		const res = await this.model
			.findOneAndUpdate<Project>(filter, update, { new: true })
			.populate("owner leader members");
		return this.parser(res);
	}
	public async remove(query: FilterQuery<Project>): Promise<IProject | null> {
		const filter = query.id ? { _id: query.id } : query;
		const res = await this.model
			.findOneAndDelete<Project>(filter)
			.populate("owner leader members");
		return this.parser(res);
	}
	public async fetchProjectsOwnedByUser(
		userId: string
	): Promise<Array<IProject>> {
		const res = await this.model
			.find<Project>({ owner: userId })
			.populate("owner leader members")
			.sort({ createdAt: -1 });
		const parsedRes = res.map(this.parser).filter((obj) => obj != null);
		if (parsedRes.length > 0) return parsedRes;
		return [];
	}
	public async fetchProjectsForUser(
		userId: string
	): Promise<Array<IProject>> {
		const res = await this.model
			.find<Project>({ members: { $in: [userId] } })
			.populate("owner leader members")
			.sort({ createdAt: -1 });
		const parsedRes = res.map(this.parser).filter((obj) => obj != null);
		if (parsedRes.length > 0) return parsedRes;
		return [];
	}
	public async fetchProjectByIdentifier(identifier: string) {
		const res = await this.model
			.findOne<Project>({ identifier })
			.populate("owner leader members");
		return this.parser(res);
	}
}

export const projectRepo = new ProjectRepo();
