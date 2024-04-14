import { Document, Schema, model, models } from "mongoose";

interface Day {
  [key: string]: [{
    exercise: string;
    sets: string;
    reps: string;
  }]
}

export interface ISplit extends Document {
  _id: string,
  title: string;
  author: { _id: string, name: string}
  days: Day[]
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