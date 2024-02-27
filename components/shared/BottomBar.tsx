"use client"

import { navItems } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function BottomBar(){
  const pathname = usePathname()

  return(
    <nav className="px-8 py-2 flex justify-between items-center bg-primary sticky bottom-0">
      {navItems.map((item) => {
        const isActive = pathname === item.route;
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