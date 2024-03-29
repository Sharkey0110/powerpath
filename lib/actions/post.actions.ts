"use server"

import { CreatePostProps, DeletePostParams, GetPostProps, GroupPostProps } from "@/types"
import { connectToDB } from "../database"
import Post from "../database/models/post.model"
import User from "../database/models/user.model"
import { handleError } from "../utils"
import Tag from "../database/models/tag.model"
import { revalidatePath } from 'next/cache'
import Comment from "../database/models/comment.model"

function populatePost(query: any){
  return query
    .populate({ path: 'author', model: User, select: '_id username photo' })
    .populate({ path: 'tag', model: Tag, select: '_id tagName' })
}

export async function createPost({ userId, post}: CreatePostProps){
  try{
    await connectToDB()
    const author = await User.findOne({ _id: userId });
    if(!author) throw new Error('User not found')
    const newPost = await Post.create({...post, tag: post.tag, author: userId, createdAt: post.createdAt })
    return JSON.parse(JSON.stringify(newPost))
  } catch(e){
    handleError(e)
  }
}

export async function getAllPosts(page: number){
  const limit = 8
  try{
    await connectToDB();
    const skipAmount = (page - 1) * limit

    const posts = await populatePost(Post.find({parentId: {$in: [null, undefined]}}).sort({ createdAt: "desc" }).skip(skipAmount).limit(limit));
    return JSON.parse(JSON.stringify(posts))
  } catch(error){
    handleError(error);
  }
}

export async function getPostsByType({ searchBy, type }: GroupPostProps){
  try{
    await connectToDB();
    if(type === "User"){
      const posts = await Post.find({author: searchBy})
      return JSON.parse(JSON.stringify(posts))
    }
    else{
      const posts = await Post.find({tag: searchBy})
      return JSON.parse(JSON.stringify(posts))
    }
  } catch(error){
    handleError(error)
  }
}

export async function getPostById(id: string){
  try{
    await connectToDB()
    const post = await populatePost(Post.find({_id: id}))
    return JSON.parse(JSON.stringify(post))
  } catch(error){
    handleError(error)
  }
}

export async function deletePost({ id, path}: DeletePostParams){
  try{
    await connectToDB()

    const deletedPost = await Post.findByIdAndDelete(id)
    if (deletedPost) revalidatePath(path)
  } catch (error){
    handleError(error)
  }

  await Comment.deleteMany({post: id})
}