import express from "express";
import morgan from "morgan";
import cors from "cors";
import robotsRouter from "./routers/robotsRouter.js";
import { generalError, notFoundError } from "./middlewares/errorMiddlewares.js";
import userRouter from "./routers/userRouter.js";

const app = express();

app.disable("x-powered-by");

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());

app.use("/robots", robotsRouter);
app.use("/user", userRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
