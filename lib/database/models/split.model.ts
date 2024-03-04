import { Document, Schema, model, models } from "mongoose";

export interface ISplit extends Document {
  _id: string,
  title: string;
  creator: { _id: string, name: string}
  monday: any[];
  tuesday: any[];
  wednesday: any[];
  thursday: any[];
  friday: any[];
  saturday: any[];
  sunday: any[];
  tag: { _id: string, name: string }
}


const SplitSchema = new Schema({
  title: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  monday: { type: Array},
  tuesday: { type: Array},
  wednesday: { type: Array },
  thursday: { type: Array },
  friday: { type: Array },
  saturday: { type: Array },
  sunday: { type: Array },
  tag: { type: Schema.Types.ObjectId, ref: 'Tag'},
})

const Split = models.Split || model('Split', SplitSchema)

export default Split;