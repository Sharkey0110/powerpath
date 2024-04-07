"use client"

import { navItems } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function LeftBar({userId}: {userId: string}){
  const pathname = usePathname()
  return(
    <nav className="pb-20 pt-32 hidden sm:flex flex-col justify-between items-center z-5 fixed left-0 bg-primary h-screen w-24 lg:w-56">
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
            <Link href={item.route} className="flex justify-center items-center gap-6">
                <p className="hidden lg:block font-bold text-2xl">{item.label}</p>
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