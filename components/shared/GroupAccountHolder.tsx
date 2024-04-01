import { IUser } from "@/lib/database/models/user.model";
import UserCard from "./UserCard";

export default function GroupAccountHolder({accounts}: {accounts: IUser[]}){
  return(
    <section >
      {accounts.length > 0 ? (
        <div>
        <ul className="pt-8 grid grid-cols-3">
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