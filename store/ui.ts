import { appTheme, sideBarLinks } from "@/constants";
import { AppNetworkStatus, AppTheme, Navigation } from "@/types";
import { create } from "zustand";
import { createSelectors } from "./utils";

type State = {
	vh: number;
	theme: AppTheme;
	accentColor: string;
	isSidebarExpanded: boolean;
	networkStatus: AppNetworkStatus;
	sideBarLinks: Array<Navigation>;
};

type Setter<T extends keyof State> = (_: State[T]) => void;

type Action = {
	setVh: Setter<"vh">;
	setTheme: Setter<"theme">;
	setAccentColor: Setter<"accentColor">;
	setIsSidebarExpanded: Setter<"isSidebarExpanded">;
	setNetworkStatus: Setter<"networkStatus">;
	setSideBarLinks: Setter<"sideBarLinks">;
};

type Store = State & Action;

const store = create<Store>((set, get) => {
	return {
		vh: 0,
		theme: appTheme.light,
		accentColor: "0, 0, 0",
		isSidebarExpanded: true,
		networkStatus: "online",
		sideBarLinks: sideBarLinks,
		setVh: (vh) => set({ vh }),
		setTheme: (theme) => {
			set({ theme });
			document.body.dataset.theme = theme;
		},
		setAccentColor: (accentColor) => set({ accentColor }),
		setIsSidebarExpanded: (isSidebarExpanded) => set({ isSidebarExpanded }),
		setNetworkStatus: (networkStatus) => set({ networkStatus }),
		setSideBarLinks: (sideBarLinks) => set({ sideBarLinks }),
	};
});

const useStore = createSelectors(store);

type Options = {
	syncOnMount?: boolean;
};

type ReturnType = Store & {
	sync: () => void;
	toggleTheme: () => void;
	toggleSidebar: () => void;
	setOpenSidebar: (_: boolean) => void;
};

type UiStoreHook = (_?: Options) => ReturnType;

export const useUiStore: UiStoreHook = (options = {}) => {
	const store = useStore();

	const sync = () => {
		// TODO: implement
	};

	const toggleTheme = () => {
		if (store.theme === appTheme.light) {
			store.setTheme(appTheme.dark);
		} else {
			store.setTheme(appTheme.light);
		}
	};

	const setOpenSidebar = (state: boolean) => {
		if (state === true) {
			document.body.style.setProperty(
				"--side-width",
				"var(--side-width-expanded)"
			);
		} else {
			document.body.style.setProperty(
				"--side-width",
				"var(--side-width-collapsed)"
			);
		}
		store.setIsSidebarExpanded(state);
	};

	const toggleSidebar = () => {
		if (store.isSidebarExpanded) {
			document.body.style.setProperty(
				"--side-width",
				"var(--side-width-collapsed)"
			);
		} else {
			document.body.style.setProperty(
				"--side-width",
				"var(--side-width-expanded)"
			);
		}
		store.setIsSidebarExpanded(!store.isSidebarExpanded);
	};

	return {
		...store,
		sync,
		toggleTheme,
		toggleSidebar,
		setOpenSidebar,
	};
};
