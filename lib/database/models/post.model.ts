import mongoose, { Document, Schema, model, models } from "mongoose";

export interface IPost extends Document {
  _id: string;
  author: {_id: string, username: string, photo: string};
  parentId?: string;
  text: string;
  picture: string;
  createdAt: number;
  tag?: {_id: string, tagName: string};
  children?: [
    {
      _id: string;
      author: string;
      parentId?: string;
      text: string;
      picture: string;
    }
  ];
}

const postSchema = new Schema({
  author: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
  parentId: { type: String },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  text: { type: String, required: true },
  picture: { type: String, required: true },
  tag: { type: Schema.Types.ObjectId, ref: "Tag" },
  createdAt: { type: Number, required: true }
});

const Post = models.Post || model("Post", postSchema);
export default Post;
