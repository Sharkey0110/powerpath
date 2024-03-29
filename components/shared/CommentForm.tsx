"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { commentFormSchema } from "@/lib/validator";
import { commentDefaultValues } from "@/constants";
import { useRouter } from "next/navigation";
import { createComment } from "@/lib/actions/comment.actions";
import { Input } from "../ui/input";

interface CommentProps{
  userId: string;
  postId: string;
}

export default function CommentForm({ userId, postId }: CommentProps){
  const initialValues = commentDefaultValues
  const router = useRouter()

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: initialValues
  })

  async function onSubmit(values: z.infer<typeof commentFormSchema>){
    try{
      const newComment = await createComment({
        userId,
        postId,
        comment: { ...values, createdAt: Date.now(), }
      }
      )

      if (newComment){
        form.reset();
        router.push(`/posts/${postId}`)
      } 
    } catch (error){
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-4">
          <FormField
           control={form.control}
           name="text"
           render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="comment" {...field} className="bg-secondary rounded-3xl text-white border-none focus-visible:ring-transparent h-11" />
              </FormControl>
            </FormItem>
           )}
          />

          <Button
          type="submit"
          size='lg'
          disabled={form.formState.isSubmitting}
          className="rounded-full max-w-[400px] mx-auto mb-5"
          >
            {form.formState.isSubmitting ? (
              'Posting...'
            ): `Submit`}
          </Button>
        </div>
      </form>
    </Form>
  )
}