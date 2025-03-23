import { AuthMapping, User } from "./models";

export type IUser = User;
export type IAuthMapping = Omit<AuthMapping, "user"> & { user: IUser | null };
