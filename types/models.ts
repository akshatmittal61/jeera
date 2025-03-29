import {
	T_OTP_STATUS,
	T_TASK_PRIORITY,
	T_TASK_STATUS,
	T_TASK_TYPE,
	T_USER_ROLE,
	T_USER_STATUS,
} from "./enum";
import { Model } from "./parser";

/**
 * AuthMapping model
 * @param {string} identifier - Identifier of the user
 * @param {string} providerId - Provider id of auth service
 * @param {string} providerName - Provider name of auth service
 * @param {Object} misc - Misc data of the user (optional)
 * @param {string} user - User id (References User model) (optional - for non-onboarded users)
 */
export type AuthMapping = Model<{
	identifier: string;
	providerId: string;
	providerName: string;
	misc?: any;
	user: string | null;
}>;

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

/**
 * Otp model
 * @param {string} email - Email of the user
 * @param {string} otp - OTP of the user
 * @param {string} status - Status of the OTP (Pending, Expired)
 */
export type Otp = Model<{
	email: string;
	otp: string;
	status: T_OTP_STATUS;
}>;

/**
 * Project model
 * @param {string} title - Title of the project
 * @param {string} description - Description of the project (optional)
 * @param {string} leader - Id of the user who owns the project (References User model) (optional)
 * @param {string} identifier - Identifier of the project
 * @param {string} start - Start date of the project (optional)
 * @param {string} end - End date of the project (optional)
 * @param {Array<string>} members - Ids of the members of the project (References User model)
 * @param {string} author - Id of the user who created the project (References User model)
 * @param {string} icon - Icon of the project (optional)
 */
export type Project = Model<{
	title: string;
	description?: string;
	leader?: string;
	identifier: string;
	start?: string;
	end?: string;
	members: Array<string>;
	author: string;
	icon?: string;
}>;

/**
 * Sprint model
 * @param {string} title - Title of the sprint
 * @param {string} project - Id of the project (References Project model)
 * @param {string} start - Start date of the sprint
 * @param {string} end - End date of the sprint
 * @param {number} count - Count of the sprint
 * @param {string} meet - Meet link of the sprint (optional)
 * @param {string} leader - Id of the leader of the sprint (References User model)
 */
export type Sprint = Model<{
	title: string;
	project: string;
	start: string;
	end: string;
	count: number;
	meet?: string;
	leader: string;
}>;

/**
 * Task model
 * @param {string} title - Title of the task
 * @param {string} identifier - Identifier of the task
 * @param {string} status - Status of the task (Todo, Doing, Done)
 * @param {string} priority - Priority of the task (Low, Medium, High)
 * @param {string} type - Type of the task (Task, Bug, Feature)
 * @param {string} storyPoint - Story point of the task (optional)
 * @param {string} description - Description of the task (optional)
 * @param {string} assignee - Id of the user who is assigned to the task (References User model) (optional)
 * @param {string} reportee - Id of the user to whom report the task (References User model) (optional)
 * @param {string} sprint - Id of the sprint (References Sprint model) (optional)
 * @param {string} project - Id of the project (References Project model)
 * @param {string} createdBy - Id of the user who created the task (References User model)
 * @param {string} start - Start date of the task (optional)
 * @param {string} end - End date of the task (optional)
 */
export type Task = Model<{
	title: string;
	identifier: string;
	status: T_TASK_STATUS;
	priority: T_TASK_PRIORITY;
	type: T_TASK_TYPE;
	storyPoint?: number;
	description?: string;
	assignee?: string;
	reportee?: string;
	sprint?: string;
	project: string;
	createdBy: string;
	start?: string;
	end?: string;
}>;
