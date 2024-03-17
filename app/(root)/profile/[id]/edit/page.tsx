import AccountForm from "@/components/shared/AccountForm";
import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/lib/database/models/user.model";

export default async function EditAccountPage({params}: {params:{id: string}}){
  const userInfo: IUser = await getUserById(params.id);
  return(
    <section className="flex flex-col items-center justify-center">
      <h1 className="pb-8">{userInfo.username}</h1>
      <div>
        <AccountForm account = {userInfo} />
      </div>
    </section>
  )
}