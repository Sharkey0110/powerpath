import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const user = await currentUser();
  const userInfo: IUser = await getUserById(params.id);
  if (!user) return null;

  const isUser = user.id === userInfo.clerkId;

  return (
    <main className="mb-auto flex flex-col justify-center items-center px-4 py-6">
      <section className="flex flex-col justify-center items-center">
        <Image  src={userInfo.photo} alt="Profile pic" width={90} height={90} className="rounded-full" />
        <h2 className="pt-4 text-[26px]">{userInfo.username}</h2>
        <div className="flex gap-1.5 text-[14px] text-zinc-500">
          <p>{userInfo.firstName}</p>
          <p>{userInfo.lastName}</p>
        </div>
      </section>

      <section className="py-28">
        <h1>Split here</h1>
      </section>

      <section>
        <h1>Posts here</h1>
      </section>
    </main>
  );
}
