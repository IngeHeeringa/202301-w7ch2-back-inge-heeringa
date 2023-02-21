import { Router } from "express";
import loginUserController from "../controllers/loginUser.js";

const userRouter = Router();

const userEndpoint = "user";

userRouter.get(`/${userEndpoint}/login`, loginUserController);

export default userRouter;
