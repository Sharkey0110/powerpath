import mongoose, { Document, Schema, model, models } from "mongoose";

export interface IPost extends Document {
    _id: string;
    author: {_id: string, username: string, photo: string};
    text: string;
    picture: string;
    createdAt: number;
    commentCount: number;
}

const postSchema = new Schema({
  author: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
  text: { type: String, required: true },
  picture: { type: String, required: true },
  createdAt: { type: Number, required: true }
});

const Post = models.Post || model("Post", postSchema);
export default Post;
