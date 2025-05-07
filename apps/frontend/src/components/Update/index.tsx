import { useWebSocket } from "../../hooks/useWebSocket";

export const Update = () => {
  const { tasks, connected } = useWebSocket("ws://localhost:3001");

  return (
    <div className=" flex justify-center items-center ">
      <span>{connected ? "🟢 Online" : "🔴 Offline"}</span>
    </div>
  );
};
