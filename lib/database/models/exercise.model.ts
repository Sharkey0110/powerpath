import { Document, Schema, model, models } from "mongoose";

export interface IExercise extends Document {
  _id: string;
  exerciseName: string;
}

const ExerciseSchema = new Schema({
  exerciseName: { type: String, required: true, unique: true },
});

const Exercise = models.Exercise || model("Exercise", ExerciseSchema);

export default Exercise;
