import { Router } from "express";
import {
  deleteRobotById,
  getRobotById,
  getRobots,
} from "../controllers/robotsControllers.js";
import auth from "../middlewares/auth.js";

const robotsRouter = Router();

robotsRouter.get("/", getRobots);
robotsRouter.get("/idRobot", getRobotById);
robotsRouter.delete("/delete/:idRobot", auth, deleteRobotById);

export default robotsRouter;
