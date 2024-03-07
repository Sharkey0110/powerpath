import { Document, Schema, model, models } from "mongoose";

export interface ITag extends Document {
  _id: string;
  tagName: string;
}

const TagSchema = new Schema({
  tagName: { type: String, required: true, unique: true },
});

const Tag = models.Tag || model("Tag", TagSchema);

export default Tag;
