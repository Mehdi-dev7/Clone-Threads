"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Button from "../Button/Button";

export default function NewPostForm() {
  // Variables
  const { data: session } = useSession();

  // State
  const [textarea, setTextaera] = useState("");

	return (
		<form action="">
			<div className="flex gap-3 w-full ">
				{/* Photo */}
        <div>
          <Image src={session?.user.profile} alt="User" width={50} height={50} className="rounded-full mt-5"/>
        </div>

				{/* Content */}
        <div className="flex-1">
          <textarea name="content" placeholder="Commencer un thread..." className="input" value={textarea} onChange={(e) => setTextaera(e.target.value)}></textarea>
        </div>
			</div>
      <div className="flex justify-end">
        <div>
          <Button formButton disabled={textarea.length < 1}>Publier</Button>
        </div>
      </div>
		</form>
	);
}
