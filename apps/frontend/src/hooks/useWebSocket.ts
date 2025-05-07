import { useEffect, useRef, useState } from "react";
import { ITask } from "../../../interfaces/task";

export function useWebSocket(url: string) {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("🔌 WebSocket connected");
      setConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as ITask | ITask[];

        if (Array.isArray(data)) {
          setTasks(data);
        } else {
          setTasks((prev) => {
            const existingIndex = prev.findIndex((t) => t.id === data.id);
            if (existingIndex !== -1) {
              const updated = [...prev];
              updated[existingIndex] = data;
              return updated;
            }
            return [...prev, data];
          });
        }
      } catch (err) {
        console.error("❌ WebSocket parse error", err);
      }
    };

    socket.onclose = () => {
      console.warn("⚠️ WebSocket closed");
      setConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return { tasks, connected };
}
