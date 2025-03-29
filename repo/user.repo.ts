import { UserModel } from "@/models";
import { IUser, User } from "@/types";
import { BaseRepo } from "./base";

class UserRepo extends BaseRepo<User, IUser> {
	protected model = UserModel;
	public async findByEmail(email: string): Promise<IUser | null> {
		const res = await this.model.findOne({ email });
		return this.parser(res);
	}
	public async findMultipleByIds(
		ids: Array<string>
	): Promise<Array<IUser | null>> {
		const res = await this.model.find({ _id: { $in: ids } });
		return res.map(this.parser);
	}
}

export const userRepo = new UserRepo();
