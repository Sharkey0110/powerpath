import { ISplit } from "@/lib/database/models/split.model";


interface Exercise {
  name: string;
  sets: number;
  reps: number;
}

export default function SplitCard({ split }: { split: ISplit }) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  return (
    <div className="bg-secondary py-2 rounded-3xl px-4 w-[400px]">
      <div>
        <h2 className="text-3xl font-bold">{split.title}</h2>
        <p>{split.author.username}</p>
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        {days.map((day, index) => (
          <div key={index}>
            <h2 className="text-xl font-bold">{day}</h2>
            <div className="flex flex-col">
              <div className="flex justify-between items-center text-sm text-slate-300 pb-1 px-4">
                <p>Exercise</p>
                <p>Sets</p>
                <p>Reps</p>
              </div>
              {(split as any)[day.toLowerCase()].map((exercise: Exercise, exerciseIndex: number) => (
                <div className="grid grid-cols-4" key={`${day}-${exerciseIndex}`}>
                  <p className="col-span-2 justify-center items-center">{exercise.name}</p>
                  <p>{exercise.sets}</p>
                  <p>{exercise.reps}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
