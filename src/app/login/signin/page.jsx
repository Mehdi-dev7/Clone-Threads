"use client";

import Button from "@/components/Button/Button";
import { checkEmail } from "@/utils/chek-emailsyntax";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export default function Sigin() {
	// Variables
	const router = useRouter();

	// Function
	const prepareLogin = async (formData) => {
		const email = formData.get("email");
		const password = formData.get("password");

		console.log(email, password);
		// If a field is empty
		if (!email || !password) {
			// Notification
			return toast.error("Veuillez remplir tous les champs");
		}
		// Check if the email is valid
		if (!checkEmail(email)) {
			// Notification
			return toast.error("L'adresse email est invalide");
		}
		// sign in the user
		try {
			const response = await signIn("credentials", { email, password, redirect: false });

      if(response.error) {
        return toast.error(response.error);
      }
		} catch (error) {
			// Notification
			return toast.error(error.message);
		}

		// Success
		toast.success("Connexion réussie");

		// Redirect to the home page
		router.replace("/");
	};
	return (
		<div className="w-[400px] mx-auto">
			{/* Title */}
			<h1 className="title flex items-center gap-1">
				<Link href="/login">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 256 256"
					>
						<path
							fill="currentColor"
							d="M222 128a6 6 0 0 1-6 6H54.49l61.75 61.76a6 6 0 1 1-8.48 8.48l-72-72a6 6 0 0 1 0-8.48l72-72a6 6 0 0 1 8.48 8.48L54.49 122H216a6 6 0 0 1 6 6"
						></path>
					</svg>
				</Link>
				Connectez-vous
			</h1>
			{/* Form */}
			<form action={prepareLogin}>
				<input
					type="email"
					name="email"
					placeholder="Email"
					className="input"
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Mot de passe"
					className="input"
					required
				/>
				<Button formButton>Se connecter</Button>
			</form>
			<div className="flex justify-center items-center mt-4">
				<div className="border-t border-threads-gray-light w-1/4"></div>
				<div className="text-threads-gray-light mx-4">ou</div>
				<div className="border-t border-threads-gray-light w-1/4"></div>
			</div>
			<Link href="/login/signup">
				<Button>Créer un compte</Button>
			</Link>
		</div>
	);
}
