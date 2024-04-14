import { IUser } from "@/lib/database/models/user.model";
import UserCard from "./UserCard";

export default function GroupAccountHolder({accounts}: {accounts: IUser[]}){
  return(
    <section className="flex flex-col justify-center items-center bg-secondary rounded-xl px-3 py-2" >
      {accounts.length > 0 ? (
        <div>
        <ul className="flex flex-col justify-center items-center gap-1">
          {accounts.map((account) => {
            return (
              <li key={account._id}>
                <UserCard account={account} />
              </li>
            )
          })}
        </ul>
      </div>
      ): (
        <div>
          <h3>No Accounts</h3>
        </div>
      )}

    </section>
  )
}