"use client";

import ConnectedLayout from "@/components/ConectedLayout/ConnectedLayout";
import Post from "@/components/Post/Post";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Profile() {
	// Variable
	const params = useParams();
	const pseudo = params.pseudo.slice(3); // slice permet de retirer les caracteres 1,2,3 du pseudo
	//console.log(params);
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
			<div className="mt-10 md:w-[700px] mx-auto text-white">
				{/* Infos */}
				<div className="flex justify-between gap-4">
					{/* Data */}

					<div>
						<h1 className="text-3xl font-semibold"> John Doe</h1>
						<div className="text-threads-gray-light mt-2">@{pseudo}</div>
						<div className="mt-5 whitespace-pre-line">-</div>
						<div className="mt-5 text-blue-500 hover:text-blue-400 duration-150">
							<a href="https://believemy.com" target="_blank">https://believemy.com</a>
						</div>
					</div>

					{/* Photo */}
					<div>
						<Image
							src="/picture.png"
							alt="User"
							width={100}
							height={100}
							className="rounded-full object-cover"
						/>
					</div>
				</div>


        {/* Tabs */}
        <div className="flex mt-10">
          {/* Threads */}
          <div className="flex-1 border-b border-white pb-4 px-4 text-center hover:text-white hover:border-white duration-150 cursor-pointer">Threads</div>
          {/* Responses */}
          <div className="flex-1 border-b border-threads-gray-light pb-4 px-4 text-center text-threads-gray-light hover:text-white hover:border-white duration-150 cursor-pointer">Réponses</div>
          {/* Reposts */}
          <div className="flex-1 border-b border-threads-gray-light pb-4 px-4 text-center text-threads-gray-light hover:text-white hover:border-white duration-150 cursor-pointer">Republications</div>
        </div>
        {/* Posts */}
        <div>
          {posts.map(post => (
            <div key={post._id}>
              <Post post={post} />
            </div>

          ))} 
        </div>
			</div>
		</ConnectedLayout>
	);
}
