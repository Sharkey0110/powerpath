"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { IPost } from "@/lib/database/models/post.model";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { postFormSchema } from "@/lib/validator";
import { postDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { createPost } from "@/lib/actions/post.actions";
import { FileUploader } from "./FileUploader";

interface PostProps {
  userId: string;
  type: "Create" | "Update";
  post?: IPost;
  postId?: string;
}

export default function PostForm({ userId, type, post, postId }: PostProps) {
  const [files, setFiles] = useState<File[]>([])
  const initialValues =
    post && type === "Update"
      ? {
          ...post,
        }
      : postDefaultValues;
  
  const router = useRouter()
  const { startUpload } = useUploadThing('imageUploader')

  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof postFormSchema>) {
    let uploadedImageUrl = values.picture;

    if(files.length > 0) {
      const uploadedImages = await startUpload(files)

      if(!uploadedImages) {
        return
      }

      uploadedImageUrl = uploadedImages[0].url
    }

    const newPost = {
      post: {...values},
      userId,
      path: '/'
    }

    if(type === 'Create'){
      try{
        const newPost = await createPost({
          post: { ...values, picture: uploadedImageUrl},
          userId,
          path: '/'
        })

        if(newPost){
          form.reset();
          router.push('/')
        }
      } catch (error){
        console.log(error)
      }
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-8 px-10">
          <FormField
            control={form.control}
            name="picture"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileUploader
                   onFieldChange={field.onChange}
                   imageUrl={field.value}
                   setFiles={setFiles}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button
         type="submit"
         size='lg'
         disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            'Posting...'
          ): `${type} Post`}
        </Button>
      </form>
    </Form>
  );
}
