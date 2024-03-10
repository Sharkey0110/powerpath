import mongoose, { Document, Schema, model, models } from "mongoose";

export interface IPost extends Document {
  _id: string;
  authorId: string;
  parentId?: string;
  text: string;
  picture: string;
  tag?: string;
  children?: [
    {
      _id: string;
      authorId: string;
      parentId?: string;
      text: string;
      picture: string;
    }
  ];
}

const postSchema = new Schema({
  authorId: { type: String, required: true },
  parentId: { type: String },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  text: { type: String, required: true },
  picture: { type: String, required: true },
  tag: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" },
});

const Post = models.Post || model("Post", postSchema);
export default Post;