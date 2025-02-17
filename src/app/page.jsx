import ConnectedLayout from "@/components/ConectedLayout/ConnectedLayout";
import Post from "@/components/Post/Post";

export default function Index() {
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
