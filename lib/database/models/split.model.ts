import { Document, Schema, model, models } from "mongoose";

export interface ISplit extends Document {
  _id: string,
  title: string;
  creator: { _id: string, name: string}
  monday: [{
    exercise: string;
    sets: number;
    reps: number;
  }];
  tuesday: [{
    exercise: string
    sets: number;
    reps: number
  }];
  wednesday: [{
    exercise: string
    sets: number;
    reps: number
  }];
  thursday: [{
    exercise: string
    sets: number;
    reps: number
  }];
  friday: [{
    exercise: string
    sets: number;
    reps: number
  }];
  saturday: [{
    exercise: string
    sets: number;
    reps: number
  }];
  sunday: [{
    exercise: string
    sets: number;
    reps: number
  }];
  tag: { _id: string, name: string }
}


const SplitSchema = new Schema({
  title: { type: String, required: true },
  creator: { type: Schema.Types.String, ref: 'User', required: true },
  monday: { type: Array},
  tuesday: { type: Array},
  wednesday: { type: Array },
  thursday: { type: Array },
  friday: { type: Array },
  saturday: { type: Array },
  sunday: { type: Array },
  tag: { type: Schema.Types.ObjectId, ref: 'Tag', required: true},
})

const Split = models.Split || model('Split', SplitSchema)

export default Split;