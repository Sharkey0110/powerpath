"use client"
import { IPost } from "@/lib/database/models/post.model";
import Image from "next/image";
import Link from "next/link";
import DeleteConfirm from "./DeleteConfirm";

interface PostProps{
  post: IPost;
  type: "Detailed" | "Simple";
  size?: string
  showDelete: boolean
  userId: string;
}

export default function Card({ post, type, size, showDelete, userId }: PostProps){
  const isUser = userId === post.author._id;
  return(
    <div className={`flex flex-col overflow-hidden rounded-lg bg-primary ${type === "Detailed" ? "h-[420px] w-[380px]" : `${size}`}`}>
      <div>
        <div className="relative">
          {isUser && showDelete === true && (
            <div className="absolute right-1 top-2 flex flex-col gap-4 rounded-xl bg-[#472e53] p-2 shadow-sm transition-all">
              <DeleteConfirm id={post._id} type="Post" />
            </div>
          )}
        </div>
        <Link href={`/posts/${post._id}`}>
          <div
          style={{backgroundImage: `url(${post.picture})`}}
          className={`flex-center flex-grow bg-cover bg-center ${type === "Detailed" ? "w-[380px] h-[300px]" : `${size}`}`}
          />
        </Link>
        {type === "Detailed" && (
          <div className="p-4">
            <div className="flex gap-6 text-xs text-slate-400">
              <p>Likes</p>
              <Link href={`/posts/${post._id}`}>
                <Image src={"/icons/comment.svg"} width={20} height={20} alt="comment" className=""/>
              </Link>
            </div>

            <div className="py-3 text-left">
              {post.text}
            </div>

            <Link className="flex gap-2" href={`/profile/${post.author._id}`}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', overflow: 'hidden' }}>
                <Image 
                  src={post.author.photo} 
                  alt="Profile pic" 
                  width={30} 
                  height={30} 
                  className="rounded-full"
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </div>
              <h3>{post.author.username}</h3>
            </Link>
        </div>
        )}
      </div>

    </div>
  )
}