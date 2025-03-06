"use server";
import { MongoClient, ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";


export const responsePost = async (postId, formData) => {
  // Variables, recuperation de session user
  const session = await getServerSession(authOptions);

  // if user is not logged in
  if (!session.user) {
    throw new Error("Vous devez être connecté pour répondre à un post");
  }
  let client;
  try {
    // Connect to the Mongodb cluster
    client = await MongoClient.connect(process.env.MONGODB_CLIENT);
    // Connect to the Mongodb database
    const db = client.db(process.env.MONGODB_DATABASE);

    const objId = ObjectId.createFromHexString(postId);

    // Création de la reponse
    const response = {
      _id: new ObjectId().toString(), // génere un ID unique pr la reponse
      pseudo: session.user.pseudo,
      content: formData.get("content"),
      profile: session.user.profile,
      creation: new Date().toString(),
      
    }

    // Ajout de la reponse dans le champ replies du post parent
    await db.collection("posts").updateOne(
      { _id: objId }, // Recherche du post parent
      { $push: { replies: response } } // Ajout de la reponse au champ replies du post parent
    );
      
    
  }
  catch (error) {
    throw new Error("Erreur lors de la réponse au post : " + error.message);
  }
  finally {
    if (client) await client.close();
  }
  revalidatePath("/");

}