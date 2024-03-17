"use client"
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
import { currentUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


interface deleteAccountProps{
  id: string
}

export default function DeleteButton({id}: deleteAccountProps){
  const router = useRouter();

  async function deleteSignOut(id: string){
    console.log("deleted... not really")
  }
  return(
    <div className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors
     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
     disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-[180px] rounded-lg"
    >
            <AlertDialog>
        <AlertDialogTrigger>(In Progress)</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-primary hover:bg-secondary hover:text-white">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteSignOut(id)} className="bg-red-600 hover:bg-red-800">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}