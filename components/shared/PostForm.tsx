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
}

export default function PostForm({ userId }: PostProps) {
  const [files, setFiles] = useState<File[]>([])
  const initialValues = postDefaultValues;
  
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

      try{
        const newPost = await createPost({
          post: { ...values, picture: uploadedImageUrl, createdAt: Date.now()},
          userId
        })

        if(newPost){
          form.reset();
          router.push('/')
        }
      } catch (error){
        console.log(error)
      }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col md:gap-20">
          <div className="xs:flex xs:flex-col md:grid md:grid-cols-2 gap-8 justify-center items-center px-10">
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
                    type = "Post"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className=" pt-4 gap-4 flex flex-col md:gap-32">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} className="bg-secondary text-white border-none focus-visible:ring-transparent md:text-lg" />
                    </FormControl>
                  </FormItem>
                )}
              />
          </div>
          </div>
            <Button
            type="submit"
            size='lg'
            disabled={form.formState.isSubmitting}
            className="rounded-xl max-w-[400px] mx-auto mb-5 mt-4"
            >
              {form.formState.isSubmitting ? (
                'Posting...'
              ): `Create Post`}
            </Button>
        </div>
      </form>
    </Form>
  );
}
