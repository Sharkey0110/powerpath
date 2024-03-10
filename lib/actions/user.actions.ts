"use server";

import { connectToDB } from "../database";
import User from "../database/models/user.model";

import { CreateUserProps, UpdateUserProps } from "@/types";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

export async function createUser(user: CreateUserProps) {
  try {
    await connectToDB();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (e) {
    handleError(e);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDB();
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    //add linked tables once existing

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (e) {
    handleError(e);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserProps) {
  try {
    await connectToDB();
    const updatedUser = await User.findByIdAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updateUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (e) {
    handleError(e);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDB();
    return await User.findOne({ clerkId: userId });
  } catch (error) {
    handleError(error);
  }
}
