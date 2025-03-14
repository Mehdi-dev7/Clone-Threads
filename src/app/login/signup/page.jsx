"use client";
import { creatUser } from "@/actions/create-user"
import Button from "@/components/Button/Button";
import Link from "next/link";
import { toast } from "react-toastify";
import { checkEmail } from "@/utils/chek-emailsyntax";
import { useRouter } from "next/navigation";

export default function Sgnup() {
	// Variables
	const router = useRouter();


	// Function
	const prepareCreateUser = async (formData) => {
		const username = formData.get("username");
		const pseudo = formData.get("pseudo");
		const email = formData.get("email");
		const password = formData.get("password");

    //console.log(username, pseudo, email, password);

		// if a field is empty
		if (!username || !pseudo || !email || !password) {
			// Notification
			return toast.error("Veuillez remplir tous les champs");
		}

		// Check if the email is valid
		if (!checkEmail(email)) {
			// Notification
			return toast.error("L'adresse email est invalide");
			
		}

		try {

			await creatUser(username, pseudo, email, password);
		}
    catch (error) {
			// Notification
			return toast.error(error.message);
		}

		// Success
		toast.success("Inscription réussie");

		// Redirect to the home page
		router.push("/login/signin");
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
				Inscrivez-vous
			</h1>
			{/* Form */}
			<form action={prepareCreateUser}>
				<input
					type="text"
					name="username"
					placeholder="Nom d'utilisateur"
					className="input"
					required
				/>
				<input
					type="text"
					name="pseudo"
					placeholder="Pseudo"
					className="input"
					required
				/>
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
				<Button formButton>S'inscrire</Button>
			</form>
			<div className="flex justify-center items-center mt-4">
				<div className="border-t border-threads-gray-light w-1/4"></div>
				<div className="text-threads-gray-light mx-4">ou</div>
				<div className="border-t border-threads-gray-light w-1/4"></div>
			</div>
			<Link href="/login/signin">
				<Button>Se connecter</Button>
			</Link>
		</div>
	);
}
