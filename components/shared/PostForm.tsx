"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { IPost } from "@/lib/database/models/post.model";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { postFormSchema } from "@/lib/validator";
import { postDefaultValues } from "@/constants";
import { DropdownMenu } from "../ui/dropdown-menu";
import Dropdown from "./Dropdown";

interface PostProps {
  userId: string;
  type: "Create" | "Edit";
  post?: IPost;
  postId?: string;
}

export default function PostForm({ userId, type, post, postId }: PostProps) {
  const initialValues =
    post && type === "Edit"
      ? {
          ...post,
        }
      : postDefaultValues;

  // 1. Define your form.
  const form = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: initialValues,
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof postFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                  <Textarea placeholder="image will go here" {...field} />
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
      </form>
    </Form>
  );
}
