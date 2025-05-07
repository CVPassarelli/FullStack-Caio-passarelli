import express, { ErrorRequestHandler } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/task.route";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);
app.use(errorHandler as unknown as ErrorRequestHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
