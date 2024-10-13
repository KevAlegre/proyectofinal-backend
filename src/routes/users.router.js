import { Router } from "express";
import { uploader } from "../utils.js";
import { setPremium, uploadDocuments, getUsers, deleteUsers } from "../controller/usersController.js";

const userRouter = Router();

userRouter.post("/:uid/documents", uploader.fields([
    {name: "profile", maxCount: 1},
    {name: "product", maxCount: 10},
    {name: "document", maxCount: 10},
]), uploadDocuments);

userRouter.post("/premium/:uid", setPremium);

userRouter.get("/getusers", getUsers);

userRouter.delete("/deleteusers", deleteUsers);


export default userRouter;