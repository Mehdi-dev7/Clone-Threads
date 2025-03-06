"use client";

import Image from "next/image";
import Link from "next/link";
import moment from "moment-timezone";
import "moment/locale/fr";
import { useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { deletePost } from "@/actions/delete-post";
import { responsePost } from "@/actions/response-post";
import { withoutMarginTop } from "next/dist/shared/lib/router/router";

export default function Post({ post }) {
	// Variables
	const { data: session } = useSession();
	const replyRef = useRef(null);

	// State
	const [optionsAreOpen, setOptionsAreOpen] = useState(false);
	const [response, setResponse] = useState("");
	const [isReplying, setIsReplying] = useState(false);

	// Cycles
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (optionsAreOpen && !event.target.closest(".options")) {
				setOptionsAreOpen(false);
			}
			if (
				isReplying &&
				replyRef.current &&
				!replyRef.current.contains(event.target)
			) {
				setIsReplying(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [optionsAreOpen, isReplying]);

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

	const onResponsePost = async () => {
		if (!response.trim()) {
			return toast.error("Vous devez écrire un message pour répondre");
		}
		const formData = new FormData();
		formData.append("content", response);
		try {
			await responsePost(post._id, formData);
			setResponse("");
			setIsReplying(false);
			toast.success("Votre message a été envoyé avec succès");
		} catch (error) {
			console.error("Erreur lors de la réponse au post : " + error.message);
			toast.error("Une erreur est survenue lors de la réponse au post");
		}
	};

	return (
		<div className="post">
			{/* Photo */}
			<div>
				<div className="w-[50px] h-[50px] relative rounded-full overflow-hidden shadow-sm">
					<Image
						src={post.profile || "/picture.png"}
						alt="User"
						fill
						sizes="48px"
						className="object-cover"
						unoptimized={true}
					/>
				</div>
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
								.utc(new Date(post.creation))
								.tz("Europe/Paris")
								.format("DD/MM/YYYY à HH:mm")
							}
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
									<>
										<div className="option">Signaler</div>
										<div className="option" onClick={() => setIsReplying(true)}>
											Répondre
										</div>
									</>
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
				{isReplying && (
					<div
						ref={replyRef}
						className="bg-threads-gray-dark p-4 rounded-xl shadow-md w-[90%] max-w-lg mb-2 mt-2"
					>
						{/* Contenu de la réponse */}
						<div className="flex items-center gap-3 w-full">
							{/* Photo */}
							<div className="w-[40px] h-[40px] relative rounded-full overflow-hidden shadow-sm">
								<Image
									src={session?.user.profile || "/picture.png"}
									alt="User"
									fill
									sizes="40px"
									className="object-cover"
									unoptimized={true}
								/>
							</div>

							{/* Champ de réponse */}
							<div className="flex-1">
								<textarea
									placeholder="Écrire une réponse..."
									className="input h-[80px] p-3"
									value={response}
									onChange={(e) => setResponse(e.target.value)}
								/>
							</div>
						</div>

						{/* Boutons */}
						<div className="flex justify-end mt-2">
							<button
								className="bg-white rounded-3xl text-black border-threads-gray-light px-4 py-1 text-sm hover:bg-gray-300 duration-150"
								onClick={onResponsePost}
								disabled={response.trim().length < 1}
							>
								Répondre
							</button>
						</div>
					</div>
				)}
				{/* Affichage des réponses */}
				{post.replies && post.replies.length > 0 && (
					<div className="mt-4 border-l border-threads-gray-light pl-4">
						{post.replies.map((reply) => (
							<div
								key={reply._id}
								className="mb-2 bg-threads-gray-dark p-3 rounded-xl"
							>
								{/* infos user */}
								<div className="flex items-center gap-2">
									<div className="w-[30px] h-[30px] relative rounded-full overflow-hidden shadow-sm">
										<Image
											src={reply.profile || "/picture.png"}
											alt="User"
											fill
											sizes="30px"
											className="object-cover"
											unoptimized
										/>
									</div>
									<b>{reply.pseudo}</b>
									<span>
										{moment
											.utc(new Date(reply.creation))
											.tz("Europe/Paris")
											.format("DD/MM/YYYY à HH:mm")}
									</span>
								</div>
								<p className="mt-2">{reply.content}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
