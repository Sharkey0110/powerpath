import { Document, Schema, model, models } from "mongoose";

export interface ISplit extends Document {
  _id: string,
  title: string;
  author: { _id: string, name: string, username: string };
  monday: Array<{ name: string; sets: string; reps: string }>;
  tuesday: Array<{ name: string; sets: string; reps: string }>;
  wednesday: Array<{ name: string; sets: string; reps: string }>;
  thursday: Array<{ name: string; sets: string; reps: string }>;
  friday: Array<{ name: string; sets: string; reps: string }>;
  saturday: Array<{ name: string; sets: string; reps: string }>;
  sunday: Array<{ name: string; sets: string; reps: string }>;

  // Index signature to allow dynamic property access
  [key: string]: any;
}

const SplitSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.String, ref: 'User', required: true },
  monday: { type: Array},
  tuesday: { type: Array},
  wednesday: { type: Array },
  thursday: { type: Array },
  friday: { type: Array },
  saturday: { type: Array },
  sunday: { type: Array },
})

const Split = models.Split || model('Split', SplitSchema)

export default Split;