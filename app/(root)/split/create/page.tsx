import SplitForm from "@/components/shared/SplitForm";
import { currentUser } from "@clerk/nextjs"

export default async function createSplitPage(){
  const user = await currentUser();
  if(!user) return
  
  return(
    <section className="mb-auto">
      <div className="bg-primary p-5 rounded-xl mt-10 max-w-[400px] mx-auto">
        <h1 className="text-2xl text-center">Creating a Split</h1>
      </div>
      <div className="pt-12">
        <SplitForm userId={user.id} />
      </div>
    </section>
  )
}