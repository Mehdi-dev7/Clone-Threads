import Image from "next/image";
import Link from "next/link";

export default function Post({ post }) {
	return (
		<div className="post">
			{/* Photo */}

			<div>
				<Image
					src={post.profile}
					alt="User"
					width={50}
					height={50}
					className="rounded-full object-cover"
				/>
			</div>

			{/* Content */}
			<div className="text-white w-full">
				{/* Infos */}
				<div className="flex items-center justify-between">
					<Link href={`/@${post.pseudo}`}>
						<b>{post.pseudo}</b>
					</Link>
					<div className="text-sm text-threads-gray-light">Il y a 1 heure</div>
				</div>
      {/* Text */}
      <div className="mt-3 whitespace-pre-line">{post.content}</div>
			</div>


		</div>
	);
}
