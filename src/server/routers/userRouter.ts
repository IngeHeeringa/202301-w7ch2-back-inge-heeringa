import { Router } from "express";
import loginUserController from "../controllers/loginUser.js";

const userRouter = Router();

const userEndpoint = "user";

userRouter.post(`/${userEndpoint}/login`, loginUserController);

export default userRouter;
