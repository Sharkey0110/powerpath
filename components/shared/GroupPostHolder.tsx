import { IPost } from "@/lib/database/models/post.model";
import Card from "./Card";
import LoadMore from "./LoadMore";

interface GroupPostProps {
  posts: IPost[],
  userId: string;
  fetch: "All" | "User"
  showDelete: boolean
}


export default async function GroupPostHolder({ posts, userId, fetch, showDelete }: GroupPostProps){

  return(
    <section >
      {posts?.length > 0 ? (
        <div>
        <section className="grid grid-cols-3 md:gap-6">
          {posts.map((post: IPost) => {
            return (
              <div key={post._id}>
                <Card post={post} type="Simple" size="h-[142px] w-[142px] md:h-[220px] md:w-[220px]" showDelete={showDelete} userId={userId} />
              </div>
            )
          })}
          <LoadMore userId={userId} type="Simple" size="h-[142px] w-[142px] md:h-[220px] md:w-[220px]" fetch={fetch} showDelete={showDelete} />
        </section>
      </div>
      ): (
        <div>
          <h3>No posts</h3>
        </div>
      )}

    </section>
  )
}