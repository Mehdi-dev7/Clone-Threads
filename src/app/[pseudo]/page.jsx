"use client";

import Button from "@/components/Button/Button";
import ConnectedLayout from "@/components/ConectedLayout/ConnectedLayout";
import Post from "@/components/Post/Post";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

export default function Profile() {
	// Variable
	const params = useParams();
	const pseudo = params.pseudo.slice(3); // slice permet de retirer les caracteres 1,2,3 du pseudo
	const router = useRouter();
	const { data: session } = useSession();
	//console.log(params);

	// State
	const [user, setUser] = useState([]);
	const [posts, setPosts] = useState([]);
	const [profileInput, setProfileInput] = useState("");
	const [bioInput, setBioInput] = useState("");
	const [linkInput, setLinkInput] = useState("");
	const [openModale, setOpenModale] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!pseudo) {
			router.push("/");
		}

		fetchUserDataPosts();
	}, []);

	useEffect(() => {
		if (openModale) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
	}, [openModale]);

	// Function
	const fetchUserDataPosts = async () => {
		const response = await fetch("/api/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				pseudo,
			}),
		});

		const data = await response.json();
		if (!response.ok) {
			throw new Error(
				"Erreur lors de la récupération des données de l'utilisateur"
			);
		}
		if (!data.user) {
			router.push("/");
			return;
		}

		setUser(data.user);
		setPosts(data.posts);
	};
	const edit = () => {
		// Set inputs
		setProfileInput(user.profile);
		setBioInput(user.bio);
		setLinkInput(user.url);

		setOpenModale(true);
	};
	const editUser = async () => {
		if (isLoading) return;
		setIsLoading(true);

		const response = await fetch("/api/user/edit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				pseudo: pseudo,
				profile: profileInput,
				bio: bioInput,
				url: linkInput,
			}),
		});

		const data = await response.json();
		if (!response.ok) {
			setIsLoading(false);
			toast.error("une erreur est survenue");
			return;
		}
		const newUser = {
			...user,
			profile: profileInput,
			bio: bioInput,
			url: linkInput,
		};
		setUser(newUser);
		setIsLoading(false);
		setOpenModale(false);
		toast.success("Le profil a été modifié avec succès");
	};

	return (
		<ConnectedLayout>
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
						<div className="modale-user-foreground">
							{/* Photo */}
							<div className="flex gap-3">
								<div className="flex-1">
									<label className="label" htmlFor="picture">
										Photo de profil
									</label>
									<input
										type="url"
										name="picture"
										className="input"
										placeholder="https://www.johndoe.com/image.png"
										value={profileInput}
										onChange={(e) => setProfileInput(e.target.value)}
									/>
								</div>
								<div>
									<Image
										src={user.profile || "/picture.png"}
										alt="User"
										width={100}
										height={100}
										className="rounded-full object-cover"
										unoptimized={true}
									/>
								</div>
							</div>
							{/* bio */}
							<div className="mt-5">
								<label htmlFor="bio" className="label">
									Biographie
								</label>
								<textarea
									name="bio"
									className="input"
									placeholder="Bio"
									id="bio"
									value={bioInput}
									onChange={(e) => setBioInput(e.target.value)}
								></textarea>
							</div>
							{/* url */}
							<div className="mt-5">
								<label htmlFor="url" className="label">
									Lien
								</label>
								<input
									type="url"
									name="url"
									className="input"
									placeholder="https://believemy.com"
									value={linkInput}
									onChange={(e) => setLinkInput(e.target.value)}
								/>
							</div>
							<div className="flex justify-end mt-1">
								<div>
									<Button onClick={editUser} disabled={isLoading}>
										Terminer
									</Button>
								</div>
							</div>
						</div>
					</div>,
					document.body
				)}
			<div className="mt-10 md:w-[700px] mx-auto text-white">
				{/* Infos */}
				<div className="flex justify-between gap-4">
					{/* Data */}

					<div>
						<h1 className="text-3xl font-semibold">{user.username}</h1>
						<div className="text-threads-gray-light mt-2">@{pseudo}</div>
						<div className="mt-5 whitespace-pre-line">{user.bio}</div>
						{user && user.url && (
							<div className="mt-5 text-blue-500 hover:text-blue-400 duration-150 inline-block">
								<a href={user.url} target="_blank">
									{user.url}
								</a>
							</div>
						)}
					</div>

					{/* Photo */}
					<div>
						<Image
							src={user.profile || "/picture.png"}
							alt="User"
							width={100}
							height={100}
							className="rounded-full object-cover"
							unoptimized={true}
						/>
					</div>
				</div>
				{/* Updating */}
				{session?.user?.pseudo === pseudo && (
					<div className="user-button" onClick={edit}>
						Modifier le profil
					</div>
				)}

				{/* Tabs */}
				<div className="flex mt-10">
					{/* Threads */}
					<div className="flex-1 border-b border-white pb-4 px-4 text-center hover:text-white hover:border-white duration-150 cursor-pointer">
						Threads
					</div>
					{/* Responses */}
					<div className="flex-1 border-b border-threads-gray-light pb-4 px-4 text-center text-threads-gray-light hover:text-white hover:border-white duration-150 cursor-pointer">
						Réponses
					</div>
					{/* Reposts */}
					<div className="flex-1 border-b border-threads-gray-light pb-4 px-4 text-center text-threads-gray-light hover:text-white hover:border-white duration-150 cursor-pointer">
						Republications
					</div>
				</div>
				{/* Posts */}
				<div>
					{posts.map((post) => (
						<div key={post._id}>
							<Post post={post} />
						</div>
					))}
				</div>
			</div>
		</ConnectedLayout>
	);
}
