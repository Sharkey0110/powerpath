import PostForm from "@/components/shared/PostForm";
import { currentUser } from "@clerk/nextjs";

export default async function CreatePostPage() {
  const user = await currentUser();

  if(!user) return null
  
  return (
    <main className="mb-auto">
      <div className="bg-primary p-5 rounded-xl mt-10 max-w-[400px] mx-auto">
        <h1 className="text-2xl text-center">Creating a Post</h1>
      </div>
      <div className="pt-12">
        <PostForm userId={user.id} type="Create" />
      </div>
    </main>
  );
}
