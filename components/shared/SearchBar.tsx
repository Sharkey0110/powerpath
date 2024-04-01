"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";

export default function SearchBar({ placeholder = "Search..."}: { placeholder?: string}){
  const [ query, setQuery ] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const delayedDebounceFn = setTimeout(() => {
      let newUrl = ''
      if(query){
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query
        })
      }
      else{
        newUrl = removeKeysFromQuery ({
          params: searchParams.toString(),
          keysToRemove: ['query']
        })
      }
      router.push(newUrl, {scroll: false})
    }, 750)
    return () => clearTimeout(delayedDebounceFn);
  }, [query, searchParams, router])

  return(
    <div className="flex justify-center items-center relative">
      <Input type="text" placeholder={placeholder} onChange={(e) => setQuery(e.target.value)}
      className = "border-none outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-secondary placeholder:text-white rounded-3xl text-lg"
      />
      <Image src={"/icons/search.svg"} alt="Search" width={26} height={26} className="absolute right-3 top-1.5" />
    </div>
  )
}