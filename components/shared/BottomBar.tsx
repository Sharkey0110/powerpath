"use client"

import { navItems } from "@/constants"
import { useAuth } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BottomBar({userId}: {userId: string}){
  const pathname = usePathname()
  console.log(userId)

  return(
    <nav className="z-10 px-8 py-2 flex justify-between items-center bg-primary sticky bottom-0">
      {navItems.map((item) => {
        const isActive =
        (pathname.includes(item.route) && item.route.length > 1) ||
        pathname === item.route;

      if (item.route === "/profile") item.route = `${item.route}/${userId}`;
        return(
          <div
          key={item.label}
          className= {`px-7 py-2 rounded-lg ${isActive && 'bg-pink-500'}`}
          >
            <Link href={item.route}>
                <Image
                src={item.icon!} alt={item.label}
                width={30} height={30}
                />
            </Link>
          </div>
        )
      })}
    </nav>
  )
}