import express from "express";
import { accountController } from "../controllers/index.js";

// Khai báo đối tượng router
const userRouter = express.Router();

userRouter.get("/", accountController.getAllUser);
userRouter.post("/", accountController.createAccount);
userRouter.post("/login", accountController.login);
userRouter.post("/changePassword", accountController.changePassword);

export default userRouter;