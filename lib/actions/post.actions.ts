"use server"

import { CreatePostProps, DeletePostParams, GetPostProps } from "@/types"
import { connectToDB } from "../database"
import Post from "../database/models/post.model"
import User from "../database/models/user.model"
import { handleError } from "../utils"
import { revalidatePath } from 'next/cache'
import Comment from "../database/models/comment.model"

export async function createPost({ userId, post}: CreatePostProps){
  try{
    await connectToDB()
    const author = await User.findOne({ _id: userId });
    if(!author) throw new Error('User not found')
    const newPost = await Post.create({...post, author: userId, createdAt: post.createdAt })
    return JSON.parse(JSON.stringify(newPost))
  } catch(e){
    handleError(e)
  }
}

export async function getAllPosts({ page, query }: GetPostProps) {
  const limit = 9;
  try {
    await connectToDB();

    const conditions: any = {};
    if (query) {
      conditions.text = { $regex: query, $options: 'i' };
    }
    const skipAmount = (page - 1) * limit;

    const posts = await Post.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({ path: 'author', model: User, select: '_id username photo' });

      const postsWithCommentsCount = await Promise.all(posts.map(async (post) => {
        const commentCount = await Comment.countDocuments({ post: post._id });
        // Create a new object with comment count added to the post
        return { ...post.toObject(), commentCount };
      }));
      return JSON.parse(JSON.stringify(postsWithCommentsCount))
  } catch (error) {
    handleError(error);
  }
}

export async function getPostsByUser({searchBy, page} : {searchBy: string, page: number}){
  const limit = 9
  try{
    await connectToDB();
    const skipAmount = (page - 1) * limit
    const posts = await Post.find({author: searchBy}).populate({ path: 'author', model: User, select: '_id username photo' }).sort({ createdAt: "desc" }).limit(limit).skip(skipAmount)
    return JSON.parse(JSON.stringify(posts))
    
  } catch(error){
    handleError(error)
  }
}

export async function getPostById(id: string){
  try{
    await connectToDB()
    const post = await Post.find({_id: id}).populate({ path: 'author', model: User, select: '_id username photo' })
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