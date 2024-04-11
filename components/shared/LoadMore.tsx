"use client"

import { getAllPosts, getPostsByUser } from "@/lib/actions/post.actions";
import { IPost } from "@/lib/database/models/post.model";
import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import Card from "./Card";

interface LoadmoreParams {
  userId: string;
  type: "Simple" | "Detailed";
  size?: string;
  fetch: "All" | "User"
}

export default function LoadMore({ userId, type, size, fetch }: LoadmoreParams) {
  const { ref, inView } = useInView();
  const [posts, setPosts] = useState<IPost[]>([]);
  const nextPageRef = useRef<number>(2); 

  useEffect(() => {
    const nextPage = nextPageRef.current;
    if (inView) {
      if (fetch === "All") {
        getAllPosts({ page: nextPage }).then((res) => {
          if (res?.length > 0) {
            setPosts((prevPosts) => [...prevPosts, ...res]);
            nextPageRef.current++; 
          }
        });
      } else {
        getPostsByUser({ searchBy: userId, page: nextPage }).then((res) => {
          if (res?.length > 0) {
            setPosts((prevPosts) => [...prevPosts, ...res]);
            nextPageRef.current++;
          }
        });
      }
    }
  }, [inView]);

  return (
    <>
      {posts.map((post) => (
        <div className="mb-12" key={post._id}>
          <Card post={post} type={type} size={size} showDelete={true} userId={userId} />
        </div>
      ))}
      <section ref={ref}>
        <p>End of posts</p>
      </section>
    </>
  );
}
