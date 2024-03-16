import { IPost } from "@/lib/database/models/post.model";
import Image from "next/image";
import Link from "next/link";

interface PostProps{
  post: IPost;
}

export default function Card({ post }: PostProps){
  return(
    <div className="flex flex-col h-[420px] w-[380px] overflow-hidden rounded-lg bg-primary">
      <div>
        <div
        style={{backgroundImage: `url(${post.picture})`}}
        className=" w-[380px] h-[260px] flex-center flex-grow bg-cover bg-center"
        />
        <div className="p-4">
          <div className="flex gap-6 text-xs text-slate-500">
            <p>Like</p>
            <p>Comment</p>
          </div>

          <div className="py-3">
            {post.text}
          </div>

          <Link href={`/profile/${post.author._id}`}>
            {post.author.username}
          </Link>
        </div>
      </div>

    </div>
  )
}