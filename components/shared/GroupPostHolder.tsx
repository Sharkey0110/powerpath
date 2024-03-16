import { getPostsByType } from "@/lib/actions/post.actions";
import { IPost } from "@/lib/database/models/post.model";
import { GroupPostProps } from "@/types";
import Card from "./Card";


export default async function GroupPostHolder({searchBy, type}: GroupPostProps){
  const posts: IPost[] = await getPostsByType({searchBy, type})

  return(
    <section >
      {posts.length > 0 ? (
        <div>
        <ul className="pt-8 grid grid-cols-3">
          {posts.map((post) => {
            return (
              <li key={post._id}>
                <Card post={post} type="Grid" />
              </li>
            )
          })}
        </ul>
      </div>
      ): (
        <div>
          <h3>No posts</h3>
        </div>
      )}

    </section>
  )
}