import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  

	// Récupérer le paremetre "query " deouis l url
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("query");
  
	if (!query) {
		return NextResponse.json(
			{ error: "Veuillez entrer un nom" },
			{ status: 400 }
		);
	}

	let client;
	try {
		// Connect to MongoDB cluster
		const client = await MongoClient.connect(process.env.MONGODB_CLIENT);
		// Connect to the database
		const db = client.db(process.env.MONGODB_DATABASE);

		// Select the "users" collection
		const users = await db
			.collection("users")
			.find({ pseudo: { $regex: query, $options: "i" } })
			.toArray();

		await client.close();
		return NextResponse.json(users);
	} catch (error) {
		console.log("Erreur api: ", error);
		await client?.close();
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
