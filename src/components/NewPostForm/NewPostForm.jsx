"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { createPost } from "@/actions/create-post";

export default function NewPostForm({ closeModale = () => {} }) {
	// Variables
	const { data: session } = useSession();

	// State
	const [textarea, setTextaera] = useState("");

	// Function
	const onPrepare = async (formData) => {
		try {
			await createPost(formData);
			setTextaera("");
			toast.success("Post créé avec succès");
		} catch (error) {
			return toast.error(error.message);
		}
		closeModale();
	};

	return (
		<form action={onPrepare}>
			<div className="flex items-center gap-3 w-full ">
				{/* Photo */}
				<div className="w-[50] h-[50] relative rounded-full overflow-hidden shadow-sm">
					<Image
						src={session?.user.profile || "/picture.png"}
						alt="User"
						fill
						sizes="48px"
						className="object-cover"
						
						unoptimized={true}
					/>
				</div>

				{/* Content */}
				<div className="flex-1">
					<textarea
						placeholder="Commencer un thread..."
						className="input"
						name="content"
						value={textarea}
						onChange={(e) => setTextaera(e.target.value)}
					></textarea>
				</div>
			</div>
			<div className="flex justify-end">
				<div>
					<Button formButton disabled={textarea.length < 1}>
						Publier
					</Button>
				</div>
			</div>
		</form>
	);
}
