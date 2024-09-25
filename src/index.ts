import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import logger from "./middlewares/logger";
import authRoutes from "./routes/authRotes";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8080;

// using the logger for every endpoint hit.
app.use(logger);

// for cors, configuration will be added as required.
app.use(cors());

// for all auth routes
app.use("/api/v1/auth", authRoutes);

// to catch other routes or render documentation as required.
app.use("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Welcome to DemoCredit server" });
});

// to catch all errors forwarded by express-async-handler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
