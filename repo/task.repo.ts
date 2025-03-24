import { TaskModel } from "@/models";
import {
	CreateModel,
	FilterQuery,
	IProject,
	ISprint,
	ITask,
	IUser,
	Task,
	UpdateQuery,
} from "@/types";
import { getNonNullValue, getObjectFromMongoResponse } from "@/utils";
import { BaseRepo } from "./base";

class TaskRepo extends BaseRepo<Task, ITask> {
	protected model = TaskModel;
	public parser(input: Task | null): ITask | null {
		const res = super.parser(input);
		if (!res) return null;
		const project = getObjectFromMongoResponse<IProject>(res.project);
		if (project) {
			res.project = project;
		}
		const sprint = getObjectFromMongoResponse<ISprint>(res.sprint);
		if (sprint) {
			res.sprint = sprint;
		}
		const assignee = getObjectFromMongoResponse<IUser>(res.assignee);
		if (assignee) {
			res.assignee = assignee;
		}
		const reportee = getObjectFromMongoResponse<IUser>(res.reportee);
		if (reportee) {
			res.reportee = reportee;
		}
		const createdBy = getObjectFromMongoResponse<IUser>(res.createdBy);
		if (createdBy) {
			res.createdBy = createdBy;
		}
		return res;
	}
	public async findOne(query: FilterQuery<Task>): Promise<ITask | null> {
		const res = await this.model
			.findOne<Task>(query)
			.populate("project sprint assignee reportee createdBy");
		return this.parser(res);
	}
	public async findById(id: string): Promise<ITask | null> {
		try {
			const res = await this.model
				.findById<Task>(id)
				.populate("project sprint assignee reportee createdBy");
			return this.parser(res);
		} catch (error: any) {
			if (error.kind === "ObjectId") return null;
			throw error;
		}
	}
	public async find(query: FilterQuery<Task>): Promise<Array<ITask> | null> {
		const res = await this.model
			.find<Task>(query)
			.populate("project sprint assignee reportee createdBy");
		const parsedRes = res.map(this.parser).filter((obj) => obj != null);
		if (parsedRes.length === 0) return null;
		return parsedRes;
	}
	public async findAll(): Promise<Array<ITask>> {
		const res = await this.model
			.find<Task>()
			.populate("project sprint assignee reportee createdBy")
			.sort({ createdAt: -1 });
		const parsedRes = res.map(this.parser).filter((obj) => obj != null);
		if (parsedRes.length > 0) return parsedRes;
		return [];
	}
	public async create(body: CreateModel<Task>): Promise<ITask> {
		const res = await this.model.create<CreateModel<Task>>(body);
		return getNonNullValue(
			this.parser(
				await res.populate("project sprint assignee reportee createdBy")
			)
		);
	}
	public async update(
		query: FilterQuery<Task>,
		update: UpdateQuery<Task>
	): Promise<ITask | null> {
		const filter = query.id ? { _id: query.id } : query;
		const res = await this.model
			.findOneAndUpdate<Task>(filter, update, { new: true })
			.populate("project sprint assignee reportee createdBy");
		return this.parser(res);
	}
	public async remove(query: FilterQuery<Task>): Promise<ITask | null> {
		const filter = query.id ? { _id: query.id } : query;
		const res = await this.model
			.findOneAndDelete<Task>(filter)
			.populate("project sprint assignee reportee createdBy");
		return this.parser(res);
	}
	public async fetchTasksForUser(userId: string): Promise<Array<ITask>> {
		const res = await this.model
			.find<Task>({
				$or: [
					{ assignee: userId },
					{ reportee: userId },
					{ createdBy: userId },
				],
			})
			.populate("project sprint assignee reportee createdBy")
			.sort({ createdAt: -1 });
		const parsedRes = res.map(this.parser).filter((obj) => obj != null);
		if (parsedRes.length > 0) return parsedRes;
		return [];
	}
}

export const taskRepo = new TaskRepo();
