import SplitForm from "@/components/shared/SplitForm";
import { getSplitById } from "@/lib/actions/split.actions";
import { auth } from "@clerk/nextjs";

interface EditSplitProps {
  params: {
    id: string
  }
}

export default async function UpdateSplitPage({params: { id }}: EditSplitProps){
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string;
  const split = await getSplitById(id);

  return(
    <section className="mb-auto">
    <div className="bg-primary p-5 rounded-xl mt-10 max-w-[400px] mx-auto">
      <h1 className="text-2xl text-center">Editing a Split</h1>
    </div>
    <div className="pt-12">
      <SplitForm userId={userId} split={split} splitId={split._id} type="Update" />
    </div>
  </section>
  )
}