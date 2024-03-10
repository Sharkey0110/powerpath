"use server"

import { CreatePostProps } from "@/types"
import { connectToDB } from "../database"
import Post from "../database/models/post.model"
import User from "../database/models/user.model"
import { handleError } from "../utils"

export async function createPost({ userId, post}: CreatePostProps){
  try{
    await connectToDB()
    const author = await User.findOne({ clerkId: userId });
    if(!author) throw new Error('User not found')
    const newPost = await Post.create({...post, tag: post.tag, author: userId})
    return JSON.parse(JSON.stringify(newPost))
  } catch(e){
    handleError(e)
  }
}

export async function getAllPosts(){
  try{
    await connectToDB();

    const posts = await Post.find();
    return JSON.parse(JSON.stringify(posts))
  } catch(error){
    handleError(error);
  }
}