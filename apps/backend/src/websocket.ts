// websocket.ts
import { WebSocketServer } from "ws";
import { Server } from "http";
import { prisma } from "./prisma/client";

let wss: WebSocketServer | null = null;

export function setupWebSocket(server: Server) {
  if (wss) return;

  wss = new WebSocketServer({ server });

  wss.on("connection", async (ws) => {
    console.log("🟢 WebSocket client connected");

    const sendTasks = async () => {
      const tasks = await prisma.task.findMany();
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(tasks));
      }
    };

    await sendTasks();
    const interval = setInterval(sendTasks, 60_000);

    ws.on("close", () => {
      clearInterval(interval);
      console.log("🔴 WebSocket client disconnected");
    });
  });
}

export async function broadcastTasks() {
  if (!wss) return;

  const tasks = await prisma.task.findMany();
  const data = JSON.stringify(tasks);

  wss.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(data);
    }
  });
}
