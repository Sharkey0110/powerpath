import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { startTransition, useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import { IExercise } from "@/lib/database/models/exercise.model"
import { createExercise, getAllExercises } from "@/lib/actions/exercise.actions"

type DropdownProps = {
  value?: string
  onChangeHandler?: () => void
}

export default function Dropdown({ value, onChangeHandler }: DropdownProps){
  const [exercises, setExercises] = useState<IExercise[]>([])
  const [newExercise, setNewExercise] = useState('');

  const handleAddExercise = () => {
    createExercise({
      exerciseName: newExercise.trim()
    })
      .then((exercise) => {
        setExercises((prevState) => [...prevState, exercise])
      })
  }

  useEffect(() => {
    const getTags = async () => {
      const exerciseList = await getAllExercises();

      exerciseList && setExercises(exerciseList as IExercise[])
    }

    getTags();
  }, [])

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="w-56 bg-secondary border-none focus-visible:ring-0 md:text-lg">
        <SelectValue placeholder="Exercise" />
      </SelectTrigger>
      <SelectContent>
        {exercises.length > 0 && exercises.map((exercise) => (
          <SelectItem key={exercise._id} value={exercise.exerciseName} className="text-md font-semibold md:text-lg">
            {exercise.exerciseName}
          </SelectItem>
        ))}

        <AlertDialog>
          <AlertDialogTrigger className="pl-8 pt-2 text-slate-500">Add new tag</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>New Tag</AlertDialogTitle>
              <AlertDialogDescription>
                <Input type="text" placeholder="Exercise name" className="mt-3" onChange={(e) => setNewExercise(e.target.value)} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddExercise)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  )
}