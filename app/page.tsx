"use client"

import { api } from "@/convex/_generated/api";
import { SignInButton, SignOutButton, useSession} from "@clerk/nextjs";
import { useMutation } from "convex/react";

export default function Home(){
  const { isSignedIn } = useSession();
  const createThumbnail = useMutation(api.thumbnails.createThumbnail);

  return (
    <main>
      {isSignedIn ? <SignOutButton/> :  <SignInButton/>}

      {isSignedIn && 
        <form onSubmit={ async (e) =>{
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(e.currentTarget);
          const title = formData.get("title") as string;
          await createThumbnail({
            title
          });
          form.reset();
        }}>
          <label>Title</label>
          <input name="title" className="text-black"></input>
          <button>Create</button>
        </form>
      }
    </main>
  )
} 