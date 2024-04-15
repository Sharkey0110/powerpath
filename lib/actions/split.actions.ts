"use server"

import { connectToDB } from "../database"
import User from "../database/models/user.model"
import Split from "../database/models/split.model"
import { handleError } from "../utils"
import { createSplitProps } from "@/types"
import Exercise from "../database/models/exercise.model"

export async function getSplitByUser( userId : string ){
  try{
    await connectToDB()
    const user = await User.findOne({_id: userId })
    if(!user) throw new Error('User not found')
    const split = await Split.findOne({author: userId}).populate({ path: 'author', model: User, select: '_id username'});
    return JSON.parse(JSON.stringify(split))
  } catch(error){
    handleError(error)
  }
}

export async function createSplit({ split, userId }: createSplitProps){
  try{
    await connectToDB()
    const author = await User.findOne({_id: userId});
    if(!author) throw new Error ("User not found")
    const newSplit = await Split.create({...split, author: userId, createdAt: split.createdAt })
  return JSON.parse(JSON.stringify(newSplit))
  } catch(error){
    handleError(error)
  }
}