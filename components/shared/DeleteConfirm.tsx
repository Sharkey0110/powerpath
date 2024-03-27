"use client"

import { usePathname } from "next/navigation"
import { useTransition } from "react"
import Image from 'next/image'

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
} from '@/components/ui/alert-dialog'

import { deletePost } from '@/lib/actions/post.actions'

export default function DeleteConfirm({postId}: { postId: string}){
  const pathname = usePathname()
  let [isPending, startTransition] = useTransition()

  return(
    <AlertDialog>
    <AlertDialogTrigger>
      <Image src="/icons/delete.svg" alt="delete" width={20} height={20} />
    </AlertDialogTrigger>

    <AlertDialogContent className="bg-secondary">
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
        <AlertDialogDescription className="p-regular-16 text-grey-600">
          This will permanently delete this event
        </AlertDialogDescription>
      </AlertDialogHeader>

      <AlertDialogFooter>
        <AlertDialogCancel className="bg-primary">Cancel</AlertDialogCancel>

        <AlertDialogAction className="bg-red-500 hover:bg-red-700"
          onClick={() =>
            startTransition(async () => {
              await deletePost({ postId, path: pathname })
            })
          }>
          {isPending ? 'Deleting...' : 'Delete'}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}