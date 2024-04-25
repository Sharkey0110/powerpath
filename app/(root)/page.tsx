import Card from "@/components/shared/Card";
import LoadMore from "@/components/shared/LoadMore";
import { getAllPosts } from "@/lib/actions/post.actions";
import { IPost } from "@/lib/database/models/post.model";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;
  const posts = await getAllPosts({page: 1});



  return(
    <main className="mb-auto text-center justify-center">
      <div className=" pt-8 flex flex-col justify-center items-center">
        {posts?.length > 0 ? (
          <div>
            <section>
              {posts.map((post: IPost) => {
                return (
                  <div className="mb-12" key={post._id}>
                    <Card post={post} type="Detailed" showDelete = {true} userId={userId} />
                  </div>
                )
              })}
            </section>
            <LoadMore userId={userId} type="Detailed" fetch="All" showDelete={true}/>
          </div>
        ) : (
          <div>
            <h3>No Posts</h3>
            <p>Uh oh</p>
          </div>
        )}
      </div>
    </main>
  )
}
