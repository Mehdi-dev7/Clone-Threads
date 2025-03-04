"use client"; // 🔥 Obligatoire pour utiliser useState et useEffect

import { useState, useEffect } from "react";
import ConnectedLayout from "@/components/ConectedLayout/ConnectedLayout";
import Button from "@/components/Button/Button";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

export default function Search() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [debouncedQuery, setDebouncedQuery] = useState("");

	// Déclenche la recherche après un délai (debounce)
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(query);
		}, 500);

		return () => clearTimeout(handler);
	}, [query]);

	const handleSearch = async (e) => {
		e.preventDefault();
		if (!debouncedQuery.trim()) return;

		setLoading(true);
		try {
			const res = await fetch(
				`/api/search?query=${encodeURIComponent(debouncedQuery)}`
			);
			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Une erreur est survenue");
			}

			setResults(data);
		} catch (error) {
			toast.error("Une erreur est survenue");
		} finally {
			setLoading(false);
		}
	};

	return (
		<ConnectedLayout>
			<div className="mt-10 md:w-[700px] mx-auto w-full">
				<form onSubmit={handleSearch}>
					<input
						onChange={(e) => setQuery(e.target.value)}
						type="search"
						placeholder="Rechercher"
						className="input"
					/>
					<div className="flex justify-end">
						<div>
							<Button formButton disabled={query.length < 1 || loading}>
								{loading ? "Recherche..." : "Rechercher"}
							</Button>
						</div>
					</div>
				</form>

				{/* Affichage des résultats */}
				<div className="mt-10">
					{loading ? (
						<div className="text-center text-gray-500">Chargement...</div>
					) : results.length > 0 ? (
						<div className="bg-threads-gray-dark text-white shadow-md rounded-lg overflow-hidden">
							{results.map((user, index) => (
								<div
									key={user._id}
									className={`flex items-center gap-3 p-3 ${
										index !== results.length - 1
											? "border-b border-gray-300"
											: ""
									}`}
								>
									<div className="w-[50] h-[50] relative rounded-full overflow-hidden shadow-sm">
										<Image
											src={user.profile}
											alt="User"
											fill
											sizes="48px"
											className="object-cover"
											unoptimized={true}
										/>
									</div>
									<Link
										href={`/@${user.pseudo}`}
										className="hover:text-gray-400 duration-150"
									>
										<b>{user.pseudo}</b>
									</Link>
								</div>
							))}
						</div>
					) : (
						<div className="text-center text-gray-500 mt-4">
							Aucun utilisateur trouvé
						</div>
					)}
				</div>
			</div>
		</ConnectedLayout>
	);
}
