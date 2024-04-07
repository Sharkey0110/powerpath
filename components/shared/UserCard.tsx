import { IUser } from "@/lib/database/models/user.model";
import Image from "next/image";
import Link from "next/link";

export default function UserCard({account}: {account:IUser}){
  return(
    <Link href={`/profile/${account._id}`} >
      <div className="flex items-center gap-4 rounded-full py-2 w-72 pl-3">
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
            <Image 
              src={account.photo} 
              alt="Profile pic" 
              width={40} 
              height={40} 
              className="rounded-full"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>

        <div>
          <p>{account.username}</p>
        </div>
      </div>
    </Link>
  )
}