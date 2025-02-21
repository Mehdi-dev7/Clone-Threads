"use client";

import Image from "next/image";
import Link from "next/link";
import moment from "moment-timezone";
import "moment/locale/fr";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-toastify";
import { deletePost } from "@/actions/delete-post";

export default function Post({ post }) {
	// Variables
	const { data: session } = useSession();

	// State
	const [optionsAreOpen, setOptionsAreOpen] = useState(false);

	// Function
	const onDeletePost = async () => {
		if (!confirm("Êtes-vous sûr de vouloir supprimer ce thread ?")) return;
		try {
			await deletePost(post._id);
		} catch (error) {
			return toast.error(error.message);
		}
		toast.success("Le thread a été supprimé avec succès");
	};

	return (
		<div className="post">
			{/* Photo */}

			<div>
				<Image
					src={post.profile}
					alt="User"
					width={50}
					height={50}
					className="rounded-full object-cover"
					unoptimized={true}
				/>
			</div>

			{/* Content */}
			<div className="text-white w-full">
				{/* Infos */}
				<div className="flex items-center justify-between">
					<Link href={`/@${post.pseudo}`}>
						<b>{post.pseudo}</b>
					</Link>
					<div className="flex items-center gap-1 text-sm text-threads-gray-light relative">
						<div>
							{moment
								.utc(post.creation, "YYYY-MM-DD HH:mm:ss")
								.tz("Europe/Paris")
								.fromNow()}
						</div>
						{session?.user && (
							<div>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="1.3em"
									height="1.3em"
									className="cursor-pointer"
									viewBox="0 0 256 256"
									onClick={() => setOptionsAreOpen((prev) => !prev)}
								>
									<path
										fill="currentColor"
										d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m0 192a88 88 0 1 1 88-88a88.1 88.1 0 0 1-88 88m12-88a12 12 0 1 1-12-12a12 12 0 0 1 12 12m44 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12m-88 0a12 12 0 1 1-12-12a12 12 0 0 1 12 12"
									></path>
								</svg>
							</div>
						)}
						{/* Options */}
						{optionsAreOpen && session?.user && (
							<div className="options">
								{session?.user && session.user.pseudo != post.pseudo ? (
									<div className="option">Signaler</div>
								) : (
									<>
										<div className="option">Modifier</div>
										<div className="option" onClick={onDeletePost}>
											Supprimer
										</div>
									</>
								)}
							</div>
						)}
					</div>
				</div>
				{/* Text */}
				<div className="mt-3 whitespace-pre-line">{post.content}</div>
			</div>
		</div>
	);
}
