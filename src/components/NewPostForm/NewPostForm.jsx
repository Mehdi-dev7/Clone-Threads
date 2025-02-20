"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { createPost } from "@/actions/create-post";

export default function NewPostForm() {
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
	};

	return (
		<form action={onPrepare}>
			<div className="flex gap-3 w-full ">
				{/* Photo */}
				<div>
					<Image
						src={session?.user.profile || "/picture.png"}
						alt="User"
						width={50}
						height={50}
						className="rounded-full mt-5"
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
