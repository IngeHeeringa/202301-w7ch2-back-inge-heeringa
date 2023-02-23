import { model } from "mongoose";
import robotSchema from "../schemas/robotSchema";

const Robot = model("Robot", robotSchema);

export default Robot;
