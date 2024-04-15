"use server"

import { connectToDB } from "../database";
import Exercise from "../database/models/exercise.model";
import { handleError } from "../utils";

export async function createExercise({ exerciseName }: { exerciseName: string }) {
  try {
    await connectToDB();

    const newExercise = await Exercise.create({ exerciseName: exerciseName });
    return JSON.parse(JSON.stringify(newExercise));
  } catch (error){
    handleError(error)
  }
}

export async function getAllExercises() {
  try{
    await connectToDB();

    const exercises = await Exercise.find().sort({exerciseName: 1});
    return JSON.parse(JSON.stringify(exercises))
  } catch(error){
    handleError(error)
  }
}