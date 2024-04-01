import { IUser } from "@/lib/database/models/user.model";
import Link from "next/link";

export default function UserCard({account}: {account:IUser}){
  return(
    <Link href={`/profiles/${account._id}`} >
      <div>
        <div>
          Image here
        </div>

        <div>
          Username here
        </div>
      </div>
    </Link>
  )
}