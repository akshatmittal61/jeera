import { Navigation } from "@/types";
import { routes } from "./routes";

export const sideBarLinks: Array<Navigation> = [
	{
		title: "Home",
		icon: "home",
		route: routes.HOME,
	},
	{
		title: "My Board",
		icon: "view_column",
		route: routes.BOARD,
	},
	{
		title: "Sprints",
		icon: "view_list",
		route: routes.SPRINTS,
	},
	{
		title: "Calendar",
		icon: "calendar_month",
		route: routes.CALENDAR,
	},
];
