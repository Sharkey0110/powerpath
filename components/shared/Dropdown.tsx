import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "@/components/ui/alert-dialog";
import { createTag, getAllTags } from "@/lib/actions/tag.actions";
import { ITag } from "@/lib/database/models/tag.model";
import { startTransition, useEffect, useState } from "react";
import { Input } from "../ui/input";

//typescript types
interface DropdownProps {
  value?: string;
  onChangeHandler: () => void;
}

export default function Dropdown({ value, onChangeHandler }: DropdownProps) {
  const [tags, setTags] = useState<ITag[]>([]);
  const [newTag, setNewTag] = useState("");

  //if users wish to add a new tag
  const handleAddCategory = () => {
    createTag({
      tagName: newTag.trim(),
    }).then((tag) => {
      setTags((prevState) => [...prevState, tag]);
    });
  };

  useEffect(() => {
    const getTags = async () => {
      const tagList = await getAllTags();

      tagList && setTags(tagList as ITag[]);
    };

    getTags();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder="Tag" />
      </SelectTrigger>
      <SelectContent>
        {tags.length > 0 &&
          tags.map((tag) => (
            <SelectItem key={tag._id} value={tag._id}>
              {tag.tagName}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>New Tag</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  onChange={(e) => setNewTag(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
}
