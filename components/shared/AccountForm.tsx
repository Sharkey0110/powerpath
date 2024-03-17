"use client"

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { IUser } from "@/lib/database/models/user.model";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { accountFormSchema } from "@/lib/validator";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { FileUploader } from "./FileUploader";
import { Input } from "../ui/input";

interface AccountProps {
  account: IUser
}

export default function AccountForm({ account }: AccountProps){
  const [files, setFiles] = useState<File[]>([])
  const initialValues = {...account}
  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader")

  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: initialValues
  });

  async function onSubmit(values: z.infer<typeof accountFormSchema>) {
    let uploadedImageUrl = values.photo;

    if(files.length > 0){
      const uploadedImages = await startUpload(files)

      if(!uploadedImages) {
        return
      }
      uploadedImageUrl = uploadedImages[0].url
    }
    try{
      await updateUser({
        id: account._id,
        account: {...values, photo: uploadedImageUrl}
      })
      router.push(`/profile/${account._id}`)
    } catch(error){
      console.log(error)
    }
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center gap-8 px-10">
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUploader
                 onFieldChange={field.onChange}
                 imageUrl={field.value}
                 setFiles={setFiles}
                 type="Account"
                />
              </FormControl>
            </FormItem>
            )}
          />
          <div className="flex gap-5 pb-8">
            <div className="flex flex-col">
              <h2>First Name</h2>
              <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="First Name" {...field} className="bg-secondary text-white border-none focus-visible:ring-transparent" />
                  </FormControl>
                </FormItem>
              )}
              />
            </div>

            <div className="flex flex-col">
              <h2>Last Name</h2>
              <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} className="bg-secondary text-white border-none focus-visible:ring-transparent" />
                  </FormControl>
                </FormItem>
              )}
              />
            </div>
          </div>
          <div className="gap-5 flex">
            <Button
             type="button"
             size="lg"
             className="rounded-xl w-[180px] mx-auto"
             onClick={() => router.push(`/profile/${account._id}`)}
            >
              Cancel
            </Button>
            <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="rounded-xl w-[180px] mx-auto"
            >
              {form.formState.isSubmitting ? (
                'Updating...'
              ) : 'Update Account'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}