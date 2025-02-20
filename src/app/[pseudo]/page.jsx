"use client";

import ConnectedLayout from "@/components/ConectedLayout/ConnectedLayout";
import Post from "@/components/Post/Post";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
	// Variable
	const params = useParams();
	const pseudo = params.pseudo.slice(3); // slice permet de retirer les caracteres 1,2,3 du pseudo
	//console.log(params);

	// State
	const [user, setUser] = useState([]);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (!pseudo) {
			notFound();
		}

		fetchUserDataPosts();
	}, []);

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
		setUser(data.user);
		setPosts(data.posts);
	};

	return (
		<ConnectedLayout>
			<div className="mt-10 md:w-[700px] mx-auto text-white">
				{/* Infos */}
				<div className="flex justify-between gap-4">
					{/* Data */}

					<div>
						<h1 className="text-3xl font-semibold">{user.username}</h1>
						<div className="text-threads-gray-light mt-2">@{pseudo}</div>
						<div className="mt-5 whitespace-pre-line">{user.bio}</div>
						{user && user.url && (
							<div className="mt-5 text-blue-500 hover:text-blue-400 duration-150">
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
						/>
					</div>
				</div>

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
