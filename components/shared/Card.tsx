import { IPost } from "@/lib/database/models/post.model";
import Image from "next/image";
import Link from "next/link";

interface PostProps{
  post: IPost;
  type: string;
}

export default function Card({ post, type }: PostProps){
  return(
    <div className={`flex flex-col overflow-hidden rounded-lg bg-primary ${type === "Solo" ? "h-[420px] w-[380px]" : "h-[150px] w-[150px]"}`}>
      <div>
        <div
        style={{backgroundImage: `url(${post.picture})`}}
        className={`flex-center flex-grow bg-cover bg-center ${type === "Solo" ? "w-[380px] h-[300px]" : "h-[150px] w-[150px]"}`}
        />
        {type === "Solo" && (
          <div className="p-4">
            <div className="flex gap-6 text-xs text-slate-500">
              <p>Like</p>
              <Link href={`/posts/${post._id}`}>
                <p>Comments</p>
              </Link>
            </div>

            <div className="py-3">
              {post.text}
            </div>

            <Link className="flex gap-1.5" href={`/profile/${post.author._id}`}>
              <Image className="rounded-full" src={post.author.photo} height={25} width={25} alt="Profile Pic" />
              <h3>{post.author.username}</h3>
            </Link>
        </div>
        )}
      </div>

    </div>
  )
}