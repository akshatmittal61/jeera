import { authRouterInterceptor } from "@/connections";
import { routes } from "@/constants";
import { useAuthStore } from "@/store";
import styles from "@/styles/pages/Home.module.scss";
import { IUser, ServerSideResult } from "@/types";
import { stylesConfig } from "@/utils";
import React from "react";

type HomePageProps = {
	user: IUser;
};

const classes = stylesConfig(styles, "home");

const HomePage: React.FC<HomePageProps> = () => {
	const { user, isLoggedIn, isLoading } = useAuthStore({
		syncOnMount: true,
	});
	return (
		<>
			<main className={classes("")}>
				<pre className="w-1/2 code overflow-hidden">
					{isLoading
						? "Loading..."
						: isLoggedIn
							? JSON.stringify(user, null, 2)
							: "Not logged in"}
				</pre>
			</main>
		</>
	);
};

export default HomePage;

export const getServerSideProps = (
	context: any
): Promise<ServerSideResult<HomePageProps>> => {
	return authRouterInterceptor(context, {
		onLoggedInAndOnboarded(user) {
			return { props: { user } };
		},
		onLoggedInAndNotOnboarded() {
			return {
				redirect: {
					destination: routes.ONBOARDING + "?redirect=/home",
					permanent: false,
				},
			};
		},
		onLoggedOut() {
			return {
				redirect: {
					destination: routes.LOGIN + "?redirect=/home",
					permanent: false,
				},
			};
		},
	});
};
