"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MongoClient, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export const deletePost = async (postId) => {
	// Variables
	const session = await getServerSession(authOptions);
  
	// Connect to MongoDB cluster
	const client = new MongoClient(process.env.MONGODB_CLIENT);
  
	// Connect to the database
	const db = client.db(process.env.MONGODB_DATABASE);
  
  const objId = ObjectId.createFromHexString(postId);
	// Get the post
	let post = await db
		.collection("posts")
		.find({ _id: objId})
		.limit(1)
		.toArray();

	//If the post doesn't exist
	if (post.length === 0) {
		throw new Error("Ce post n'existe pas");
	}

	// If thue user is not the autor of the post
	if (post[0].pseudo !== session.user.pseudo) {
		throw new Error("Vous n'avez pas le droit de supprimer ce post");
	}

	// Delete the post
	try {
		await db
			.collection("posts")
			.deleteOne({ _id: objId });
	} catch (error) {
		throw new Error(error.message);
	}

	await client.close();
	revalidatePath("/", "/[pseudo]");
};
