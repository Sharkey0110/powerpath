

import Card from "@/components/shared/Card"
import { getPostById } from "@/lib/actions/post.actions"

export default async function postDetailPage({ params }: { params: { id: string}}){

  const post = await getPostById(params.id)

  return(
    <section className="flex flex-col justify-center items-center">
      <div>
        <ul>
          <Card post = {post[0]} type="Solo" />
        </ul>
      </div>

      <div>
        <p>This is where you will add a comment</p>
      </div>
      <div>
        This is where comments will be
      </div>
    </section>
  )
}