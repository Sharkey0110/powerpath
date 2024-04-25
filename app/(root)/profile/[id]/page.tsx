import GroupPostHolder from "@/components/shared/GroupPostHolder";
import SplitCard from "@/components/shared/SplitCard";
import { Button } from "@/components/ui/button";
import { getPostsByUser } from "@/lib/actions/post.actions";
import { getSplitByUser } from "@/lib/actions/split.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IPost } from "@/lib/database/models/post.model";
import { ISplit } from "@/lib/database/models/split.model";
import { IUser } from "@/lib/database/models/user.model";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";


export default async function ProfilePage({params}: {params: { id: string };}) {
  const user = await currentUser();
  const userInfo: IUser = await getUserById(params.id);
  const posts: IPost[] = await getPostsByUser({searchBy: params.id, page : 1})
  const split: ISplit = await getSplitByUser(params.id)
  if (!user) return null;

  const isUser = user.id === userInfo._id;

  return (
    <main className="mb-auto flex flex-col justify-center items-center py-6 text-center">
      <section className="flex flex-col justify-center items-center">
        <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden' }}>
          <Image 
            src={userInfo.photo} 
            alt="Profile pic" 
            width={120} 
            height={120} 
            className="rounded-full"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>
        <h2 className="pt-4 text-3xl font-bold pb-2">{userInfo.username}</h2>
        <div className="flex gap-1.5 text-sm text-zinc-500 pb-5">
          <p>{userInfo.firstName}</p>
          <p>{userInfo.lastName}</p>
        </div>
        {isUser && (
          <div className="flex gap-5">
            <Link href={`/profile/${params.id}/edit`}>
            <Button className="w-[180px] rounded-lg">
              Edit Account
            </Button>
          </Link>

          </div>
        )}
      </section>

      <section className="py-8">
        <h2 className="text-xl font-semibold pb-5">Split</h2>
        {(isUser && !split) ? (
          <Link href="/split/create">
            <Button size="lg">
              Create Split
            </Button>
          </Link>
        ) :
         (!isUser && !split) ? <p>User does not have a split</p> :
         split && <SplitCard split={split} isUser={isUser} />}
      </section>

      <section>
        <h1>Posts</h1>
        <GroupPostHolder posts={posts} userId={user.id} fetch="User" showDelete={true} />
      </section>
    </main>
  );
}
