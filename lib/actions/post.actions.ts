"use server"

import { CreatePostProps } from "@/types"
import { connectToDB } from "../database"
import Post from "../database/models/post.model"
import User from "../database/models/user.model"
import { handleError } from "../utils"
import Tag from "../database/models/tag.model"

function populatePost(query: any){
  return query
    .populate({ path: 'author', model: User, select: 'clerkId username' })
    .populate({ path: 'tag', model: Tag, select: '_id tagName' })
}

export async function createPost({ userId, post}: CreatePostProps){
  try{
    await connectToDB()
    const author = await User.findOne({ _id: userId });
    if(!author) throw new Error('User not found')
    const newPost = await Post.create({...post, tag: post.tag, author: userId, createdAt: post.createdAt})
    return JSON.parse(JSON.stringify(newPost))
  } catch(e){
    handleError(e)
  }
}

export async function getAllPosts(){
  try{
    await connectToDB();

    const posts = await populatePost(Post.find().sort({ createdAt: "desc" }));
    return JSON.parse(JSON.stringify(posts))
  } catch(error){
    handleError(error);
  }
}