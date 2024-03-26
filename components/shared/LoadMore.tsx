"use client"

import { getAllPosts } from "@/lib/actions/post.actions"
import { IPost } from "@/lib/database/models/post.model"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import Card from "./Card"

let nextPage = 2;

export default function LoadMore(){
  const { ref, inView } = useInView()
  const [posts, setPosts] = useState<IPost[]>([])

  useEffect(()=> {
    if(inView){
      getAllPosts(nextPage)
      .then((res) => {
        setPosts([...posts, ...res])
        nextPage++;
      })
    }
  }, [inView, posts])

  return(
    <>
      <ul>
        {posts.map((post) => {
          return (
            <li className="mb-12" key={post._id}>
              <Card post={post} type="Solo" />
            </li>
          )
        })}
      </ul>

      <section ref={ref}>
        <p>Loading...</p>
      </section>
    </>
  )
}