import Card from "@/components/shared/Card";
import LoadMore from "@/components/shared/LoadMore";
import { getAllPosts } from "@/lib/actions/post.actions";
import { IPost } from "@/lib/database/models/post.model";
import { SearchParamsProps } from "@/types";

export default async function Home({ searchParams }: SearchParamsProps) {
  const page = Number(searchParams?.page) || 1;
  const posts: IPost[] = await getAllPosts({page});
  return(
    <main className="mb-auto text-center">
      <div className=" pt-8 flex flex-col justify-center items-center">
        {posts.length > 0 ? (
          <div>
            <ul>
              {posts.map((post) => {
                return (
                  <li className="mb-12" key={post._id}>
                    <Card post={post} type="Detailed" />
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
