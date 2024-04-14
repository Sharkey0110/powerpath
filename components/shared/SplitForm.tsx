"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { splitFormSchema } from "@/lib/validator"
import { splitDefaultValues } from "@/constants"
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { createSplit } from "@/lib/actions/split.actions";

interface DayInputProps {
  control: any;
  day: string;
}

//mapped over form that creates all 7 days uniquely, kept in same file because i dont like splitting forms
//look over this later its complex remember it
function DayInput({ control, day }: DayInputProps) {
  // UseFieldArray allows for easy field counting, addition and deletion.
  const { fields, append, remove } = useFieldArray({
    control,
    name: `days.${day.toLowerCase()}`,
  });

  const maxExercisesPerDay = 7;
  const canAddExercise = fields.length < maxExercisesPerDay;

  return (
    <div className="flex flex-col gap-3">
      <h2>{day}</h2>
      {fields.map((exercise, index) => (
        <div key={index} className="flex">
          <FormField
            control={control}
            // Template string name so that each row has a different name and doesnt clash, also needed to get into the embedded data, such as days.monday.1.name, which is how its stored in JSON
            name={`days.${day.toLowerCase()}.${index}.name`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Exercise" {...field} className="bg-secondary text-white border-none focus-visible:ring-transparent"/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`days.${day.toLowerCase()}.${index}.sets`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Sets" type="number" {...field} className="bg-secondary text-white border-none focus-visible:ring-transparent"/>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={`days.${day.toLowerCase()}.${index}.reps`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Reps" type="number" {...field} className="bg-secondary text-white border-none focus-visible:ring-transparent"/>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="button" onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}
      {/* Disable the "Add Exercise" button when maximum exercises reached */}
      <Button type="button" onClick={() => canAddExercise && append({ name: '', sets: '', reps: '' })} disabled={!canAddExercise}>Add Exercise</Button>
    </div>
  );
}


//exported JSX component 
export default function SplitForm({ userId }: { userId: string }){
  const initialValues = splitDefaultValues
  const router = useRouter();
  const form = useForm<z.infer<typeof splitFormSchema>>({
    resolver: zodResolver(splitFormSchema),
    defaultValues: initialValues
  })
  const { control, handleSubmit, formState } = form;

  //submit
  async function onSubmit(values: z.infer<typeof splitFormSchema>){
    try{
      const newSplit = await createSplit({
        split: { ...values, createdAt: Date.now()},
        userId
      })

      if(newSplit){
        form.reset();
        router.push('/')
      }
    } catch(error){
      console.log(error)
    }
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col px-3 text-center text-lg font-semibold gap-5 justify-center items-center">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Title" {...field} className="bg-secondary text-white border-none focus-visible:ring-transparent" />
                </FormControl>
              </FormItem>
            )}
          />
          {days.map((day, index) => (
            <DayInput key={index} control={control} day={day} />
          ))}
        </div>
        <Button
          type="submit"
          size='lg'
          disabled={formState.isSubmitting}
          className="rounded-xl max-w-[400px] mx-auto mb-5"
        >
          {formState.isSubmitting ? 'Creating...' : `Create Split`}
        </Button>
      </form>
    </Form>
  )
}