import ConnectedLayout from "@/components/ConectedLayout/ConnectedLayout";
import Post from "@/components/Post/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import NewPostForm from "@/components/NewPostForm/NewPostForm";

export default async function Index() {
	// Variables
	const session = await getServerSession(authOptions);

	const posts = [
		{
			_id: "1",
			content: "Bienvenu sur mon tout nouveau profil Threads !",
			pseudo: "johnDoe",
			profile: "/picture.png",
		},
		{
			_id: "2",
			content: "Bienvenu sur mon tout nouveau profil Threads !",
			pseudo: "johnDoe",
			profile: "/picture.png",
		},
		{
			_id: "3",
			content: "Bienvenu sur mon tout nouveau profil Threads !",
			pseudo: "johnDoe",
			profile: "/picture.png",
		},
		{
			_id: "4",
			content: "Bienvenu sur mon tout nouveau profil Threads !",
			pseudo: "johnDoe",
			profile: "/picture.png",
		},
		{
			_id: "5",
			content: "Bienvenu sur mon tout nouveau profil Threads !",
			pseudo: "johnDoe",
			profile: "/picture.png",
		},
	];
	return (
		<ConnectedLayout>
			<div className="md:w-[700px] w-full mx-auto mt-10">
				{/* New post */}
				{session?.user && (
					<div className="border-b border-threads-gray-dark py-4">
						<NewPostForm />
					</div>
				)}

				{/* Posts */}
				{posts.map((post) => (
          
          <div key={post._id}>
						<Post post={post} />
					</div>
				))}
			</div>
		</ConnectedLayout>
    
	);
}
