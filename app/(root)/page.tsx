import Card from "@/components/shared/Card";
import { getAllPosts } from "@/lib/actions/post.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IPost } from "@/lib/database/models/post.model";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const userId = await currentUser();
  if(!userId) return null
  const user = await getUserById(userId.id)
  //if(!user.onboarded) redirect("/onboarding")

  const posts: IPost[] = await getAllPosts();
  return(
    <main className="mb-auto">
      <div className=" pt-8 flex flex-col justify-center items-center">
        {posts.length > 0 ? (
          <div>
            <ul>
              {posts.map((post) => {
                return (
                  <li className="mb-12" key={post._id}>
                    <Card post={post} type="Solo" />
                  </li>
                )
              })}
            </ul>
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
