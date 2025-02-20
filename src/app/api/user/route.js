import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  // Get the pseudo from the requet body
  const data = await request.json();
  const {pseudo} = data;

  let client;

  try {
    // Connect to the Mongodb cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);

    // Connect to the Mongodb database
    const db = client.db(process.env.MONGODB_DATABASE);

    // get the "users" collection
    let user = await db.collection("users").find({ pseudo }).limit(1).toArray();

    // If the pseudo is not found
    if (!user) {
      
      throw new Error("l utilisateur n'existe pas");
    }

    // Format user
    user = user.map(user => ({
      ...user,
      _id: user._id.toString(),  // Convert the _id to string
    }))[0]; // Get the first element of the array

    // get the "posts" collection
    let posts = await db.collection("posts").find({ pseudo }).sort({ creation: -1 }).toArray();

    // Format posts
    posts = posts.map(post => ({
      ...post,
      _id: post._id.toString(),  // Convert the _id to string
    }))

    await client.close();

    return NextResponse.json({
      user,
      posts,
    },{status: 200}
  );
    
  } catch (error) {
    await client.close();
    throw new Error(error.message);
    
  }

}