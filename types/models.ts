import { T_USER_ROLE, T_USER_STATUS } from "./enum";
import { Model } from "./parser";

/**
 * User model
 * @param {string} name - Name of the user (optional - defaults to email prefix)
 * @param {string} email - Email of the user
 * @param {string} phone - Phone number of the user (optional)
 * @param {string} avatar - Avatar of the user (optional)
 * @param {string} status - Status of the user (Joined, Invited)
 * @param {string} role - Role of the user (User, Admin, Guest)
 * @param {string} invitedBy - Id of the user who invited the user (References User model) (optional - for invited users)
 */
export type User = Model<{
	name?: string;
	email: string;
	phone?: string;
	avatar?: string;
	status: T_USER_STATUS;
	role: T_USER_ROLE;
	invitedBy?: string;
}>;
