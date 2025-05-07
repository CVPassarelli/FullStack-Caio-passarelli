import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { WebSocketServer } from "ws";

import taskRouter from "./routes/task.route";
import userRouter from "./routes/users.route";
import { errorHandler } from "./middleware/errorHandler";
import { setupWebSocket } from "./websocket";

dotenv.config();

const app = express();
const server = createServer(app);
setupWebSocket(server);

app.use(cors());
app.use(express.json());
app.use("/api", taskRouter);
app.use("/api", userRouter);
app.use(errorHandler as unknown as ErrorRequestHandler);

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
