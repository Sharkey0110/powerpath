"use server"

import { CreateCommentProps } from "@/types"
import { connectToDB } from "../database"
import Comment from "../database/models/comment.model"
import User from "../database/models/user.model"
import { handleError } from "../utils"
import { revalidatePath } from "next/cache"
import Post from "../database/models/post.model"

export async function createComment({ userId, postId, createdAt, comment}: CreateCommentProps){
  try{
    connectToDB()
    const author = await User.findOne({ _id: userId})
    if(!author) throw new Error ("User not found")
    const postToComment = await Post.findById(postId)
    if(!postToComment) throw new Error ("Post not found")
    const newComment = await Comment.create({...comment, author: userId, post: postId, createdAt: createdAt})
    return JSON.parse(JSON.stringify(newComment))
  } catch(error){
    handleError(error)
  }
}