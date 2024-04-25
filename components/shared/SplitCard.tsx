import { ISplit } from "@/lib/database/models/split.model";
import DeleteConfirm from "./DeleteConfirm";
import Link from "next/link";
import Image from "next/image";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
}

export default function SplitCard({ split, isUser }: { split: ISplit, isUser: boolean }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  return (
    <div className="relative bg-secondary py-2 rounded-3xl px-4 w-[400px]">
      {isUser && (
        <div className="absolute right-2 top-2 flex flex-col gap-4 rounded-xl bg-[#472e53] p-2 shadow-sm transition-all">
          <DeleteConfirm id={split._id} type="Split" />
  
          <Link href={`/split/${split._id}/update`}>
            <Image src="/icons/edit.svg" alt="edit" width={18} height={18} />
          </Link>
        </div>
      )}
      <div>
        <h2 className="text-3xl font-bold">{split.title}</h2>
        <p>{split.author.username}</p>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        {days.map((day, index) => (
          <div key={index}>
            <h2 className="text-xl font-bold">{day}</h2>
            {split[day.toLowerCase()] && split[day.toLowerCase()].length > 0 ? (
              <div className="flex flex-col">
                <div className="grid grid-cols-4 justify-between items-center text-sm text-slate-300 pb-1 px-4">
                  <p className="flex col-span-2 justify-center items-center">Exercise</p>
                  <p className="flex justify-center items-center">Sets</p>
                  <p className="flex justify-center items-center">Reps</p>
                </div>
                {split[day.toLowerCase()].map((exercise: Exercise, exerciseIndex: number) => (
                  <div className="grid grid-cols-4" key={`${day}-${exerciseIndex}`}>
                    <p className="flex col-span-2 justify-center items-center">{exercise.name}</p>
                    <p className="flex justify-center items-center">{exercise.sets}</p>
                    <p className="flex justify-center items-center">{exercise.reps}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-slate-300">Rest Day</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
