import { SprintModel } from "@/models";
import {
	CreateModel,
	FilterQuery,
	IProject,
	ISprint,
	IUser,
	Sprint,
	UpdateQuery,
} from "@/types";
import { getNonNullValue, getObjectFromMongoResponse } from "@/utils";
import { BaseRepo } from "./base";

class SprintRepo extends BaseRepo<Sprint, ISprint> {
	protected model = SprintModel;
	public parser(input: Sprint | null): ISprint | null {
		const res = super.parser(input);
		if (!res) return null;
		const project = getObjectFromMongoResponse<IProject>(res.project);
		if (project) {
			res.project = project;
		}
		const leader = getObjectFromMongoResponse<IUser>(res.leader);
		if (leader) {
			res.leader = leader;
		}
		return res;
	}
	public async findOne(query: FilterQuery<Sprint>): Promise<ISprint | null> {
		const res = await this.model
			.findOne<Sprint>(query)
			.populate("leader project");
		return this.parser(res);
	}
	public async findById(id: string): Promise<ISprint | null> {
		try {
			const res = await this.model
				.findById<Sprint>(id)
				.populate("leader project");
			return this.parser(res);
		} catch (error: any) {
			if (error.kind === "ObjectId") return null;
			throw error;
		}
	}
	public async find(
		query: FilterQuery<Sprint>
	): Promise<Array<ISprint> | null> {
		const res = await this.model
			.find<Sprint>(query)
			.populate("leader project");
		const parsedRes = res.map(this.parser).filter((obj) => obj != null);
		if (parsedRes.length === 0) return null;
		return parsedRes;
	}
	public async findAll(): Promise<Array<ISprint>> {
		const res = await this.model
			.find<Sprint>()
			.populate("leader project")
			.sort({ createdAt: -1 });
		const parsedRes = res.map(this.parser).filter((obj) => obj != null);
		if (parsedRes.length > 0) return parsedRes;
		return [];
	}
	public async create(body: CreateModel<Sprint>): Promise<ISprint> {
		const res = await this.model.create<CreateModel<Sprint>>(body);
		return getNonNullValue(
			this.parser(await res.populate("leader project"))
		);
	}
	public async update(
		query: FilterQuery<Sprint>,
		update: UpdateQuery<Sprint>
	): Promise<ISprint | null> {
		const filter = query.id ? { _id: query.id } : query;
		const res = await this.model
			.findOneAndUpdate<Sprint>(filter, update, { new: true })
			.populate("leader project");
		return this.parser(res);
	}
	public async remove(query: FilterQuery<Sprint>): Promise<ISprint | null> {
		const filter = query.id ? { _id: query.id } : query;
		const res = await this.model
			.findOneAndDelete<Sprint>(filter)
			.populate("leader project");
		return this.parser(res);
	}
}

export const sprintRepo = new SprintRepo();
