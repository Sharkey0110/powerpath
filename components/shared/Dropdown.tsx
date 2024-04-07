import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ITag } from "@/lib/database/models/tag.model"
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
import { createTag, getAllTags } from "@/lib/actions/tag.actions"

type DropdownProps = {
  value?: string
  onChangeHandler?: () => void
}

export default function Dropdown({ value, onChangeHandler }: DropdownProps){
  const [tags, setTags] = useState<ITag[]>([])
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    createTag({
      tagName: newTag.trim()
    })
      .then((tag) => {
        setTags((prevState) => [...prevState, tag])
      })
  }

  useEffect(() => {
    const getTags = async () => {
      const tagList = await getAllTags();

      tagList && setTags(tagList as ITag[])
    }

    getTags();
  }, [])

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="bg-secondary border-none focus-visible:ring-0 md:text-lg">
        <SelectValue placeholder="Tag" />
      </SelectTrigger>
      <SelectContent>
        {tags.length > 0 && tags.map((tag) => (
          <SelectItem key={tag._id} value={tag._id} className="text-md font-semibold md:text-lg">
            {tag.tagName}
          </SelectItem>
        ))}

        <AlertDialog>
          <AlertDialogTrigger className="pl-8 pt-2 text-slate-500">Add new tag</AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>New Tag</AlertDialogTitle>
              <AlertDialogDescription>
                <Input type="text" placeholder="Tag name" className="mt-3" onChange={(e) => setNewTag(e.target.value)} />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddTag)}>Add</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  )
}