import { AppSeo, routes } from "@/constants";
import { Button, Typography } from "@/library";
import { stylesConfig } from "@/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./styles.module.scss";

type HomeHeroProps = {};

const classes = stylesConfig(styles, "home-hero");

export const Hero: React.FC<HomeHeroProps> = () => {
	const router = useRouter();
	const [scrolled, setScrolled] = useState(false);
	useEffect(() => {
		const vh = window.innerHeight / 100;
		document.addEventListener("scroll", () => {
			if (window.scrollY > 25 * vh) setScrolled(true);
			else setScrolled(false);
		});
		return () => {
			document.removeEventListener("scroll", () => {});
		};
	}, []);
	return (
		<section className={classes("")}>
			<div className={classes("-card")}>
				<div
					className={classes("-card-frame")}
					style={{
						padding: scrolled ? "0" : "0.5rem 0.25rem",
					}}
					data-aos="fade-in"
					data-aos-duration={2000}
				>
					<div
						className={classes("-card-box")}
						style={{
							width: !scrolled ? "99%" : "100%",
							height: !scrolled ? "99%" : "100%",
						}}
					>
						<div
							className={classes("-box-head")}
							data-aos="zoom-out"
						>
							<div className={classes("-box-image")}>
								<Image
									className={classes("-box-image__img")}
									src={AppSeo.icon}
									alt={AppSeo.title || ""}
									width={1920}
									height={1080}
								/>
							</div>
							<div className={classes("-box-title")}>
								<Typography
									as="h1"
									family="alice"
									size="head-1"
									weight="bold"
									className={classes("-box-title__text")}
								>
									{AppSeo.title}
								</Typography>
								<Button
									size="large"
									icon={<AiOutlineArrowRight />}
									iconPosition="right"
									onClick={() => {
										router.push(routes.LOGIN);
									}}
								>
									Get Started Today
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};
