"use client";

import Link from "next/link";
import Footer from "../Footer/Footer";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Button from "../Button/Button";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import NewPostForm from "../NewPostForm/NewPostForm";

export default function ConnectedLayout({ children }) {
	// Variables

	const pathname = usePathname();
	const { data: session } = useSession();

	// State
	const [openModale, setOpenModale] = useState(false);

	// Cycle
	useEffect(() => {
		if (openModale) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [openModale]);

	return (
		<section className="flex flex-col min-h-screen px-5">
			{openModale &&
				createPortal(
					<div
						className="modale-background"
						onClick={(e) => {
							if (e.target === e.currentTarget) {
								setOpenModale(false);
							}
						}}
					>
						<div className="modale-foreground">
							<NewPostForm closeModale={() => setOpenModale(false)} />
						</div>
					</div>,
					document.body
				)}

			{/* Header */}
			<header className="flex justify-between items-center py-4">
				{/* Nav */}
				<nav className="absolute top-0 left-0 right-0 flex justify-center py-7 gap-5 z-0">
					<Link href="/">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`w-10 h-10 hover:bg-threads-gray-dark duration-150 p-1 rounded-xl ${
								pathname === "/" ? "text-white" : "text-threads-gray-light"
							}`}
							viewBox="0 0 256 256"
						>
							<path
								fill="currentColor"
								d="M224 120v96a8 8 0 0 1-8 8h-56a8 8 0 0 1-8-8v-52a4 4 0 0 0-4-4h-40a4 4 0 0 0-4 4v52a8 8 0 0 1-8 8H40a8 8 0 0 1-8-8v-96a16 16 0 0 1 4.69-11.31l80-80a16 16 0 0 1 22.62 0l80 80A16 16 0 0 1 224 120"
							></path>
						</svg>
					</Link>

					{/* Search */}
					<Link href="/search">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className={`w-10 h-10 hover:bg-threads-gray-dark duration-150 p-1 rounded-xl ${
								pathname === "/search"
									? "text-white"
									: "text-threads-gray-light"
							}`}
							viewBox="0 0 256 256"
						>
							<path
								fill="currentColor"
								d="M232.49 215.51L185 168a92.12 92.12 0 1 0-17 17l47.53 47.54a12 12 0 0 0 17-17ZM44 112a68 68 0 1 1 68 68a68.07 68.07 0 0 1-68-68"
							></path>
						</svg>
					</Link>

					{/* Create */}
					{session?.user?.email && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="w-10 h-10 hover:bg-threads-gray-dark duration-150 p-1 text-threads-gray-light cursor-pointer rounded-xl"
							viewBox="0 0 256 256"
							onClick={() => setOpenModale(true)}
						>
							<path
								fill="currentColor"
								d="m232.49 55.51l-32-32a12 12 0 0 0-17 0l-96 96A12 12 0 0 0 84 128v32a12 12 0 0 0 12 12h32a12 12 0 0 0 8.49-3.51l96-96a12 12 0 0 0 0-16.98M192 49l15 15l-11 11l-15-15Zm-69 99h-15v-15l56-56l15 15Zm105-7.43V208a20 20 0 0 1-20 20H48a20 20 0 0 1-20-20V48a20 20 0 0 1 20-20h67.43a12 12 0 0 1 0 24H52v152h152v-63.43a12 12 0 0 1 24 0"
							></path>
						</svg>
					)}

					{/* User */}
					{session?.user?.email && (
						<Link href={`/@${session.user.pseudo}`}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className={`w-10 h-10 hover:bg-threads-gray-dark duration-150 p-1 rounded-xl ${
									pathname.includes("@")
										? "text-white"
										: "text-threads-gray-light"
								}`}
								viewBox="0 0 256 256"
							>
								<path
									fill="currentColor"
									d="M234.38 210a123.36 123.36 0 0 0-60.78-53.23a76 76 0 1 0-91.2 0A123.36 123.36 0 0 0 21.62 210a12 12 0 1 0 20.77 12c18.12-31.32 50.12-50 85.61-50s67.49 18.69 85.61 50a12 12 0 0 0 20.77-12M76 96a52 52 0 1 1 52 52a52.06 52.06 0 0 1-52-52"
								></path>
							</svg>
						</Link>
					)}
				</nav>
				{/* Logo */}
				<Image src="/logo.png" alt="Threads" width={40} height={40} />

				{/* Button */}

				<div className="z-10">
					{session?.user?.email ? (
						<Button withoutMarginTop onClick={() => signOut()}>
							Se déconnecter
						</Button>
					) : (
						<Link href="/login">
							<Button withoutMarginTop>Se connecter</Button>
						</Link>
					)}
				</div>
			</header>

			{/* Content */}
			<div className="flex-1">{children}</div>

			{/* Footer */}
			<Footer />
		</section>
	);
}
