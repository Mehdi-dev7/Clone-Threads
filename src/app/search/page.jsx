"use client"; // 🔥 Obligatoire pour utiliser useState et useEffect

import { useState, useEffect } from "react";
import ConnectedLayout from "@/components/ConectedLayout/ConnectedLayout";
import Button from "@/components/Button/Button";
import { toast } from "react-toastify";

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
						<ul className="space-y-4">
							{results.map((user) => (
								<li
									key={user._id}
									className="p-4 border rounded-lg bg-gray-100"
								>
									<a href={`/@${user.pseudo}`} className="user-button">
										{user.pseudo}
									</a>
								</li>
							))}
						</ul>
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
