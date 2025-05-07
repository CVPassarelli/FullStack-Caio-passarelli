import { ITask } from "../../../../interfaces/task";

export const TaskCard = ({
  card,
  onClick,
}: {
  card: ITask;
  onClick: (id: number) => void;
}) => {
  return (
    <div
      className="shadow-md p-3 hover:bg-slate-50 cursor-pointer"
      onClick={() => onClick(card.id)}>
      <h4 className="border-b py-2">{card.title}</h4>
      <p className="text-sm py-2">{card.description}</p>
      <span className="text-xs font-bold">{card.assigne}</span>
      <div
        className={`${
          !card.completed ? "bg-blue-500" : "bg-green-400"
        } w-full border mt-4 flex justify-center items-center text-xs text-white font-bold rounded-full`}>
        {!card.completed ? "Ready for dev" : "Done"}
      </div>
    </div>
  );
};
