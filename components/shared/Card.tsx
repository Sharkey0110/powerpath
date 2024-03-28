import { IPost } from "@/lib/database/models/post.model";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import DeleteConfirm from "./DeleteConfirm";

interface PostProps{
  post: IPost;
  type: string;
}

export default function Card({ post, type }: PostProps){
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;
  const isUser = userId === post.author._id;

  return(
    <div className={`flex flex-col overflow-hidden rounded-lg bg-primary ${type === "Solo" ? "h-[420px] w-[380px]" : "h-[150px] w-[150px]"}`}>
      <div>
        <Link href={`/posts/${post._id}`}>
          <div
          style={{backgroundImage: `url(${post.picture})`}}
          className={`flex-center flex-grow bg-cover bg-center ${type === "Solo" ? "w-[380px] h-[300px]" : "h-[150px] w-[150px]"}`}
          />
        </Link>
        {type === "Solo" && (
          <div className="p-4 relative">
            {isUser && (
              <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-white p-3 shadow-sm transition-all">
                  <DeleteConfirm postId={post._id} />
              </div>
            )}
            <div className="flex gap-6 text-xs">
              <p>Likes</p>
              <Link href={`/posts/${post._id}`}>
                <p>Comments</p>
              </Link>
            </div>

            <div className="py-3 text-left">
              {post.text}
            </div>

            <Link className="flex gap-1.5" href={`/profile/${post.author._id}`}>
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