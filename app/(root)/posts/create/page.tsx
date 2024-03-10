import PostForm from "@/components/shared/PostForm";
import { auth } from "@clerk/nextjs";

export default function CreatePostPage() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <main className="mb-auto">
      <div className="bg-primary p-5 rounded-xl mt-10 max-w-[400px] mx-auto">
        <h1 className="text-2xl text-center">Creating a Post</h1>
      </div>
      <div className="pt-12">
        <PostForm userId={userId} type="Create" />
      </div>
    </main>
  );
}