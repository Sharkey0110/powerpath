import { CreateTagProps } from "@/types";
import { connectToDB } from "../database";
import Tag from "../database/models/tag.model";
import { handleError } from "../utils";

export async function createTag({ tagName }: CreateTagProps) {
  try {
    await connectToDB();

    const newTag = await Tag.create({ tagName: tagName });
    return JSON.parse(JSON.stringify(newTag));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllTags() {
  try {
    await connectToDB();

    const tags = await Tag.find();
    return JSON.parse(JSON.stringify(tags));
  } catch (error) {
    handleError(error);
  }
}