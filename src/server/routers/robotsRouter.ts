import { Router } from "express";
import { getRobots } from "../controllers/robotsControllers";

const robotsRouter = Router();

const robotsEndpoint = "robots";

robotsRouter.get(`/${robotsEndpoint}`, getRobots);

export default robotsRouter;
