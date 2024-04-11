

import Card from "@/components/shared/Card"
import CommentForm from "@/components/shared/CommentForm"
import DeleteConfirm from "@/components/shared/DeleteConfirm";
import { getCommentsOfPost } from "@/lib/actions/comment.actions";
import { getPostById } from "@/lib/actions/post.actions"
import { IComment } from "@/lib/database/models/comment.model";
import { IPost } from "@/lib/database/models/post.model";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function postDetailPage({ params }: { params: { id: string}}){
  const user = await currentUser();
  if(!user) return null

  const post: IPost[] = await getPostById(params.id)
  const comments = await getCommentsOfPost(params.id)

  const isPost = user.id === post[0].author._id

  return(
    <section className="flex flex-col items-center justify-center gap-5 mt-6">
      <div>
        <ul>
          <Card post = {post[0]} type="Simple" size="h-[360px] w-[360px]" showDelete={false} userId={user.id} />
        </ul>
      </div>

      <div>
        <CommentForm postId={params.id} userId={user.id} />
      </div>

      <div className="flex flex-col gap-3 w-full px-5 justify-center">
        {comments.map((comment: IComment) => {
          const isUser = user.id === comment.author._id;
          return(
            <div key={comment._id} className="relative bg-secondary flex items-center p-2 rounded-3xl gap-4">
              <Link href={`/profile/${comment.author._id}`} >
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden' }}>
                  <Image 
                    src={comment.author.photo} 
                    alt="Profile pic" 
                    width={50} 
                    height={50} 
                    className="rounded-full"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
              </Link>
            <div>
              <Link href={`/profile/${comment.author._id}`} >
                <p>{comment.author.username}</p>
              </Link>
              <p>{comment.text}</p>
            </div>
              {isPost || isUser ? (
                <div className="absolute right-2 top-3.5 flex flex-col gap-4 rounded-2xl bg-[#472e53] p-2 shadow-sm transition-all">
                  <DeleteConfirm id={comment._id} type="Comment" />
                </div>
              ) : null}
          </div>
          )
        })}
      </div>
    </section>
  )
}