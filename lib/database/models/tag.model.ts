import { Schema, model, models } from "mongoose";

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true}
})

const Tag = models.Tag || model('Split', TagSchema)

export default Tag;