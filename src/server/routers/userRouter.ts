import { loginUser, registerUser } from "../controllers/userControllers.js";
import { Router } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const userRouter = Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename(req, file, callback) {
    const suffix = uuidv4();
    const mimetype = file.mimetype.split("/");
    const extension = mimetype[mimetype.length - 1];
    callback(null, `${file.fieldname}-${suffix}.${extension}`);
  },
});

const upload = multer({ storage });

userRouter.post("/register", upload.single("image"), registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
