import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  const data = await request.json();

  const pseudo = data.pseudo;
  const profile = data.profile;
  let bio = data.bio;
  const url = data.url;

  if(!bio) {
    bio = "-";
  }

  let client;
  try {
    // Connect to MongoDB cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    // Connect to the database
    const db = client.db(process.env.MONGODB_DATABASE);
    
    // First: Verify if the user exists
    let user = await db.collection('users').find({ pseudo }).limit(1).toArray();

    
    if (user.length === 0) {
      await client.close();
      return NextResponse.json({ error: "Cet utilisateur n'existe pas" }, { status: 404 });
    }
    // Second : Updating the user

    await db.collection("users").updateOne({ pseudo }, { $set: { profile, bio, url } });
    await client.close();
    return NextResponse.json({ message: "Le profil a été modifié avec succès" });

  }
  catch(error) {
    await client.close();
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}