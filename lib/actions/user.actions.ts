"use server";

import { connectToDB } from "../database";
import User from "../database/models/user.model";

import { CreateUserProps, UpdateUserProps } from "@/types";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import Post from "../database/models/post.model";

export async function createUser(user: CreateUserProps) {
  try {
    await connectToDB();

    const newUser = await User.create({_id: user.clerkId, ...user});
    return JSON.parse(JSON.stringify(newUser));
  } catch (e) {
    handleError(e);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDB();
    const userToDelete = await User.findOne({ _id:clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    await Promise.all([
      Post.updateMany(
        {_id: { $in: userToDelete.posts}},
        { $pull: { author: userToDelete._id}}
      ),
      //split and freinds needed later
    ])

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (e) {
    handleError(e);
  }
}

export async function updateUser({id, account}: UpdateUserProps) {
  try {
    await connectToDB();
    const userToUpdate = await User.findById(id)
    if(!userToUpdate || userToUpdate._id !== id) throw new Error ("User not found or unauthorised")
    const updatedUser = await User.findByIdAndUpdate(id,{ ...account}, { new: true}
  )

  return JSON.parse(JSON.stringify(updatedUser))
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDB();
    return await User.findOne({_id: userId});
  } catch (error) {
    handleError(error);
  }
}
