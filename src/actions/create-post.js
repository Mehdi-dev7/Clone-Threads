"use server";

import { MongoClient } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";

export const createPost = async (formData) => {
	// Variables, recuperation de session user
	const session = await getServerSession(authOptions);

	// if user is not logged in
	if (!session.user) {
		throw new Error("Vous devez être connecté pour créer un nouveau post");
	}
  let client;
	try {
		// Connect to the Mongodb cluster
		client = await MongoClient.connect(process.env.MONGODB_CLIENT);
		// Connect to the Mongodb database
		const db = client.db(process.env.MONGODB_DATABASE);

		// Add the post
		await db.collection("posts").insertOne({
			pseudo: session.user.pseudo,
			content: formData.get("content"),
			profile: session.user.profile,
			creation: new Date(),
		});
	} catch (error) {
    throw new Error("Erreur lors de la création du post : " + error.message);
  } finally {
    if (client) await client.close();
  }
	revalidatePath("/");
};
