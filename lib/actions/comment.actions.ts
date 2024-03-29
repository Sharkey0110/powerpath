"use server"

import { CreateCommentProps, DeletePostParams } from "@/types"
import { connectToDB } from "../database"
import Comment from "../database/models/comment.model"
import User from "../database/models/user.model"
import { handleError } from "../utils"
import { revalidatePath } from "next/cache"
import Post from "../database/models/post.model"

export async function createComment({ userId, postId, comment}: CreateCommentProps){
  try{
    connectToDB()
    const author = await User.findOne({ _id: userId})
    if(!author) throw new Error ("User not found")
    const postToComment = await Post.findById(postId)
    if(!postToComment) throw new Error ("Post not found")
    const newComment = await Comment.create({...comment, author: userId, post: postId})
    return JSON.parse(JSON.stringify(newComment))
  } catch(error){
    handleError(error)
  }
}

export async function getCommentsOfPost(postId: string){
  try{
    connectToDB()
    const post = await Post.findOne({ _id: postId });
    if(!post) throw new Error ("Post not found");
    const comments = await Comment.find({ post: postId }).populate({ path: 'author', model: User, select: '_id username photo' }).sort({ createdAt: "desc" })
    return JSON.parse(JSON.stringify(comments))
  } catch(error){
    handleError(error)
  }
}

export async function deleteComment({ id, path }: DeletePostParams){
  try{
    connectToDB()
    const deletedComment = await Comment.findByIdAndDelete(id)
    if(deletedComment) revalidatePath(path)
  } catch (error){
    handleError(error)
  }
}