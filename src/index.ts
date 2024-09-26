import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import logger from "./middlewares/logger";
import authRoutes from "./routes/authRotes";
import errorHandler from "./middlewares/errorHandler";
import cors from "cors";
import dbConfig from "./utils/dbConfig";
import path from "path";
import walletRouter from "./routes/walletRoutes";
import cookieParser from "cookie-parser";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 8080;

// using the logger for every endpoint hit.
app.use(logger);

// for cors, configuration will be added as required.
app.use(cors());

// for all auth routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/wallet", walletRouter);

// to catch other routes or render documentation as required.
app.use("/", (req: Request, res: Response) => {
  return res.status(200).json({ message: "Welcome to DemoCredit server" });
});

// parsers
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// to catch all errors forwarded by express-async-handler
app.use(errorHandler);
const startServer = async () => {
  try {
    await dbConfig();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.log("Unable to start server", err);
  }
};
startServer();
