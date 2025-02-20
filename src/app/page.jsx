import ConnectedLayout from "@/components/ConectedLayout/ConnectedLayout";
import NewPostForm from "@/components/NewPostForm/NewPostForm";
import Post from "@/components/Post/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { MongoClient } from "mongodb";

export default async function Index() {
	// Variables
	const session = await getServerSession(authOptions);

	let posts, client;
	try {
		// Connect to MongoDB cluster
		client = await MongoClient.connect(process.env.MONGODB_CLIENT);

		// Connect to the database
		const db = client.db(process.env.MONGODB_DATABASE);

		// Select the post collection

		posts = await db
			.collection("posts")
			.find()
			.sort({ creation: -1 }) //sort = ca tri du plus recent au plus ancien
			.toArray();

		// Format posts
		posts = posts.map((post) => ({
			...post,
			_id: post._id.toString(),
		}));
	} catch (error) {
		throw new Error(error.message);
	}
	await client.close();

	//console.log(posts);

	return (
		<ConnectedLayout>
			<div className="md:w-[700px] w-full mx-auto mt-10">
				{/* New post */}
				{session?.user && (
					<div className="border-b border-threads-gray-dark">
						<NewPostForm />
					</div>
				)}

				{/* Posts */}
				{posts.map((post) => (
					
					<Post key={post._id} post={post} />
					
				))}
			</div>
		</ConnectedLayout>
	);
}
