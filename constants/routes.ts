export const routes = Object.freeze({
	ROOT: "/",
	ABOUT: "/about",
	CONTACT: "/contact",
	HOME: "/home",
	LOGIN: "/login",
	ONBOARDING: "/onboarding",
	PRIVACY_POLICY: "/privacy-policy",
	BOARD: "/board",
	SPRINTS: "/sprints",
	CALENDAR: "/calendar",
	TASK: (id: string) => `/tasks/${id}`,
	SPRINT: (id: string) => `/sprints/${id}`,
});
