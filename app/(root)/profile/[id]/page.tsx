import DeleteButton from "@/components/shared/DeleteButton";
import GroupPostHolder from "@/components/shared/GroupPostHolder";
import { Button } from "@/components/ui/button";
import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";


export default async function ProfilePage({params}: {params: { id: string };}) {
  const user = await currentUser();
  const userInfo: IUser = await getUserById(params.id);
  console.log(userInfo)
  if (!user) return null;

  const isUser = user.id === userInfo._id;

  return (
    <main className="mb-auto flex flex-col justify-center items-center px-4 py-6 text-center">
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
        <h2 className="pt-4 text-[26px]">{userInfo.username}</h2>
        <div className="flex gap-1.5 text-[14px] text-zinc-500 pb-5">
          <p>{userInfo.firstName}</p>
          <p>{userInfo.lastName}</p>
        </div>
        {isUser ? (
          <div className="flex gap-5">
            <Link href={`/profile/${params.id}/edit`}>
            <Button className="w-[180px] rounded-lg">
              Edit Account
            </Button>
          </Link>

          <DeleteButton id= {userInfo._id} />
          </div>
        ) : (
          <Button>
            Follow
          </Button>
        )}
      </section>

      <section className="py-10">
        <h1>Split here</h1>
      </section>

      <section>
        <h1>Posts</h1>
        <GroupPostHolder searchBy={userInfo._id} type="User" />
      </section>
    </main>
  );
}
