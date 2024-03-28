

import Card from "@/components/shared/Card"
import CommentForm from "@/components/shared/CommentForm"
import { getPostById } from "@/lib/actions/post.actions"
import { currentUser } from "@clerk/nextjs";

export default async function postDetailPage({ params }: { params: { id: string}}){
  const user = await currentUser();
  if(!user) return null

  const post = await getPostById(params.id)

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
        <p>This is where you will see comments</p>
      </div>
    </section>
  )
}