"use server";
import { checkEmail } from "@/utils/chek-emailsyntax";
import bcrypt from "bcrypt";
import { MongoClient } from "mongodb";

export const creatUser = async (username, pseudo, email, password) => {
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
	// Cnnect to the Mongodb cluster
	const client = await MongoClient.connect(process.env.MONGODB_CLIENT);

	// Connect to the Mongodb database
	const db = client.db(process.env.MONGODB_DATABASE);

	try {
		// Create the user
		// First : verifiy if this email is not already used
		// Selected the "users" collection
		let users = await db
			.collection("users")
			.find({ email: email })
			.limit(1)
			.toArray();

		// If the email is already used
		if (users.length !== 0) {
			await client.close();
			throw new Error("Cet email est déjà utilisé");
		}

		// Second: Verify if this pseudo is already used
		let user = await db
			.collection("users")
			.find({ pseudo: pseudo })
			.limit(1)
			.toArray();

		// If the pseudo is already used
		if (user.length !== 0) {
			await client.close();
			throw new Error("Ce pseudo est déjà utilisé");
		}

		// Third: Encrypt the password
		const encryptedPassword = await bcrypt.hash(password, 10);

		// Fourth: Create the user
		await db.collection("users").insertOne({
			username,
			pseudo,
			email,
			password: encryptedPassword,
			profile: "/picture.png",
			bio: "_",
			url: "",
			creation: new Date(),
		});
	} catch (e) {
		await client.close();
		throw new Error(e);
	}
	await client.close();
};
