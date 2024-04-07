"use server"

import { connectToDB } from "../database"
import User from "../database/models/user.model"
import Split from "../database/models/split.model"
import { handleError } from "../utils"

export async function getSplitByUser( userId : string ){
  try{
    await connectToDB()
    const user = await User.findOne({_id: userId })
    if(!user) throw new Error('User not found')
    const split = await Split.findOne({creator: userId})
    return JSON.parse(JSON.stringify(split))
  } catch(error){
    handleError(error)
  }
}