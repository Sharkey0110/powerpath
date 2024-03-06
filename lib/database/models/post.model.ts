import mongoose, { Schema, model, models } from "mongoose";

const postSchema = new Schema({
  authorId: { type: String, required: true },
  parentId: { type: String },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  text: { type: String, required: true },
  picture: { type: String, required: true }
})

const Post = models.Post || model('Post', postSchema)
export default Post