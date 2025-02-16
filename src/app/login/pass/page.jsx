"use client";

import Button from "@/components/Button/Button";
import Link from "next/link";

export default function Pass() {

  const onContinu = () => {
    alert("Continuer");
  }


	return (
		<div className="w-[440px] mx-auto">
			{/* Title */}
			<h1 className="title flex items-center gap-1">
				<Link href="/login">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						viewBox="0 0 256 256"
					>
						<path
							fill="currentColor"
							d="M222 128a6 6 0 0 1-6 6H54.49l61.75 61.76a6 6 0 1 1-8.48 8.48l-72-72a6 6 0 0 1 0-8.48l72-72a6 6 0 0 1 8.48 8.48L54.49 122H216a6 6 0 0 1 6 6"
						></path>
					</svg>
				</Link>
				Continuer en mode invité
			</h1>
			{/* Text */}
      <p className="text-threads-gray-light mt-4">
        Vous pouvez naviguer dans Threads sans profil, mais vous ne pourrez pas interagir avec du contenu ni en publier.
      </p>

			{/* Button */}
      <Button onClick={onContinu}>Continuer</Button>
		</div>
	);
}
