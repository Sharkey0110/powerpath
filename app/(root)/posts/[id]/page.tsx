

import Card from "@/components/shared/Card"
import CommentForm from "@/components/shared/CommentForm"
import { getCommentsOfPost } from "@/lib/actions/comment.actions";
import { getPostById } from "@/lib/actions/post.actions"
import { currentUser } from "@clerk/nextjs";

export default async function postDetailPage({ params }: { params: { id: string}}){
  const user = await currentUser();
  if(!user) return null

  const post = await getPostById(params.id)
  const comments = await getCommentsOfPost(params.id)

  return(
    <section className="flex flex-col justify-center items-center">
      <div>
        <ul>
          <Card post = {post[0]} type="Solo" />
        </ul>
      </div>

      <div>
        <CommentForm postId={params.id} userId={user.id} />
      </div>

      <div>
        {comments.map((comment) => (
          <p>{comment.text}</p>
        ))}
      </div>
    </section>
  )
}