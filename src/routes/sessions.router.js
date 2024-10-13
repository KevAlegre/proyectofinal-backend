import { Router } from "express";
import passport from "passport";
import {registerUser, failRegister, loginUser, failLogin, logoutUser} from "../controller/sessionsController.js"


const sessionRouter = Router();

sessionRouter.post("/register", passport.authenticate("register", {failureRedirect: "failregister"}), registerUser);
sessionRouter.get("/failregister", failRegister)
sessionRouter.post("/login", passport.authenticate("login", {failureRedirect: "faillogin"}), loginUser);
sessionRouter.get("/faillogin", failLogin);
sessionRouter.get("/github", passport.authenticate("github", {scope: "user.email"}), async (req, res) => {});
sessionRouter.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/login"}), async (req, res) => {
    req.session.user = req.user;
});
sessionRouter.post("/logout", logoutUser);

export default sessionRouter;