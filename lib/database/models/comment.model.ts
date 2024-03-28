import mongoose, { Document, Schema, model, models } from "mongoose";

export interface IComment extends Document {
  _id: string;
  text: string;
  author: {_id: string, username: string, photo: string}
  post: { _id: string }
  createdAt: number;
}

const commentSchema = new Schema({
  author: { type: mongoose.Schema.Types.String, ref: 'User', required: true},
  text: {type: String, required: true},
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }
})

const Comment = models.Comment || model("Comment", commentSchema);
export default Comment