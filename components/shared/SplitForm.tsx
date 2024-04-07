"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { splitFormSchema } from "@/lib/validator"
import { splitDefaultValues } from "@/constants"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";


export default function SplitForm({ userId }: { userId: string }){
  const initialValues = splitDefaultValues

  const router = useRouter()

  const form = useForm<z.infer<typeof splitFormSchema>>({
    resolver: zodResolver(splitFormSchema),
    defaultValues: initialValues
  })

  async function onSubmit(values: z.infer<typeof splitFormSchema>){
    try{
      console.log(values)
      // const newSplit = await createSplit({
      //   split: { ...values },
      //   userId
      // })

      // if(newSplit){
      //   form.reset();
      //   router.push(`/profile/${userId}`)
      // }
    } catch(error){
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-8">
        <div className="flex flex-col px-3 text-center text-lg font-semibold gap-5 justify-center items-center">
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Title" {...field} className="bg-secondary text-white border-none focus-visible:ring-transparent" />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-3">
            <h2>Monday</h2>
            <div className="flex">
              <FormField
              control={form.control}
              name="temp1"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Exercise" {...field} className="bg-secondary text-white border-none focus-visible:ring-transparent"/>
                  </FormControl>
                </FormItem>
              )}
              />

              <FormField
              control={form.control}
              name="temp2"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="sets" {...field} className="bg-secondary text-white border-none focus-visible:ring-transparent"/>
                  </FormControl>
                </FormItem>
              )}
              />

              <FormField
              control={form.control}
              name="temp3"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="reps" {...field} className="bg-secondary text-white border-none focus-visible:ring-transparent"/>
                  </FormControl>
                </FormItem>
              )}
              />
            </div>
          </div>
        </div>
          <Button
            type="submit"
            size='lg'
            disabled={form.formState.isSubmitting}
            className="rounded-xl max-w-[400px] mx-auto mb-5"
            >
              {form.formState.isSubmitting ? (
                'Posting...'
              ): `Create Split`}
            </Button>
      </form>
    </Form>
  )
}