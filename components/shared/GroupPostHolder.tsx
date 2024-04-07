import { IPost } from "@/lib/database/models/post.model";
import Card from "./Card";


export default async function GroupPostHolder({posts}: {posts: IPost[]}){

  return(
    <section >
      {posts.length > 0 ? (
        <div>
        <ul className="grid grid-cols-3 md:gap-6">
          {posts.map((post) => {
            return (
              <li key={post._id}>
                <Card post={post} type="Simple" size="h-[142px] w-[142px] md:h-[220px] md:w-[220px]" showDelete={true} />
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