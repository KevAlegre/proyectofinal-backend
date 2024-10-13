import { Router } from "express";
import { isAuth, isNotAuth } from "../services/auth.js";
import { renderAdminDashboard, renderPremiumDashboard,  renderLogin, renderRegister, renderUserDashboard, renderCart, renderProfile, renderMocks, recoverPassword, resetPassword, userList, redirectToLogin } from "../controller/viewsController.js";

const viewsRouter = Router();

viewsRouter.get("/", redirectToLogin);
viewsRouter.get("/login", isNotAuth, renderLogin);
viewsRouter.get("/register", isNotAuth, renderRegister);
viewsRouter.get("/products", isAuth, renderUserDashboard);
viewsRouter.get("/realtimeproducts", isAuth, renderPremiumDashboard);
viewsRouter.get("/admindashboard", isAuth, renderAdminDashboard);
viewsRouter.get("/admindashboard/userlist", isAuth, userList);
viewsRouter.get("/current", isAuth, renderProfile);
viewsRouter.get("/carts/", isAuth, renderCart);
viewsRouter.get("/recoverpassword", recoverPassword);
viewsRouter.get("/resetpassword/:token", resetPassword);

viewsRouter.get("/mockingproducts", renderMocks)

viewsRouter.get("/chat", (req, res) => {
    res.render("chat", {});
});

export default viewsRouter;