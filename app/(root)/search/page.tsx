import GroupAccountHolder from "@/components/shared/GroupAccountHolder";
import GroupPostHolder from "@/components/shared/GroupPostHolder";
import SearchBar from "@/components/shared/SearchBar";
import { getAllPosts } from "@/lib/actions/post.actions";
import { getAccounts } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { SearchParamsProps } from "@/types";
import { currentUser } from "@clerk/nextjs";

export default async function SearchPage({ searchParams }: SearchParamsProps){
  const user = await currentUser();
  if(!user) return null

  const searchText = (searchParams?.query as string) || '';
  const posts = await getAllPosts({
    page: 1,
    query: searchText
  });

  const accounts: IUser[] = await getAccounts({
    userId: user.id,
    query: searchText
  })

  return(
    <main className="mb-auto flex flex-col justify-center items-center pt-8 gap-6 text-center">
      <section>
        <SearchBar />
      </section>

      <section>
        <h2 className="text-[18px] pb-2">Accounts</h2>
        <GroupAccountHolder accounts={accounts} />
      </section>

      <section>
        <h2 className="text-[18px] pb-2">Posts</h2>
        <GroupPostHolder posts={posts} userId={user.id} fetch="All" showDelete={false} />
      </section>
    </main>
  )
}