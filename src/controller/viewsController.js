import { getProductsService } from "../services/productsServices.js";
import { getCartService } from "../services/cartsServices.js";
import config from "../config/config.js";
import { generateProducts } from "../utils.js";
import { getUsersService } from "../services/userServices.js";

export const redirectToLogin = (req, res) => {
    res.redirect("/login");
};

export const renderLogin = (req, res) => {
    res.render("login");
};

export const renderRegister = (req, res) => {
    res.render("register");
};

export const renderUserDashboard = async (req, res) => {
    try {
        const cartId = req.user.cart;
        const {limit, page, sort, query} = req.query;
        const products = await getProductsService(limit, page, sort, query);
        products.cart = cartId;
        const profileLink = `http://${config.railway_public_domain}:${config.port}/current`;
        const cartLink = `http://${config.railway_public_domain}:${config.port}/carts`
        const {prevPage, nextPage, hasPrevPage, hasNextPage} = products;
        const prevLink = hasPrevPage ? `http://${config.railway_public_domain}:${config.port}/products?page=${prevPage}` : null;
        const nextLink = hasNextPage ? `http://${config.railway_public_domain}:${config.port}/products?page=${nextPage}` : null;
        res.render("products", {products, prevLink, nextLink, page, cartId, profileLink, cartLink});
    } catch (error) {
        req.logger.error(error);
    };
};

export const renderPremiumDashboard = async (req, res) => {
    try {
        const { user } = req.session;
        const {limit, page, sort, query} = req.query;
        const products = await getProductsService(limit, page, sort, query);
        const cartLink = `http://${config.railway_public_domain}:${config.port}/carts`
        const {prevPage, nextPage, hasPrevPage, hasNextPage} = products;
        const prevLink = hasPrevPage ? `http://${config.railway_public_domain}:${config.port}/realtimeproducts?page=${prevPage}` : null;
        const nextLink = hasNextPage ? `http://${config.railway_public_domain}:${config.port}/realtimeproducts?page=${nextPage}` : null;
        res.render("realtimeproducts", {products, prevLink, nextLink, page, user, cartLink});
    } catch (error) {
        req.logger.error(error);
    };
};

export const renderAdminDashboard = async (req, res) => {
    try {
        const { user } = req.session;
        const {limit, page, sort, query} = req.query;
        const products = await getProductsService(limit, page, sort, query);
        const userList = `http://${config.railway_public_domain}:${config.port}/admindashboard/userlist`;
        const {prevPage, nextPage, hasPrevPage, hasNextPage} = products;
        const prevLink = hasPrevPage ? `http://${config.railway_public_domain}:${config.port}/admindashboard?page=${prevPage}` : null;
        const nextLink = hasNextPage ? `http://${config.railway_public_domain}:${config.port}/admindashboard?page=${nextPage}` : null;
        res.render("admindashboard", {products, prevLink, nextLink, page, user, userList});
    } catch (error) {
        req.logger.error(error);
    };
};

export const userList = async (req, res) => {
    try {
        const users = await getUsersService();
        const dashboardLink = `http://${config.railway_public_domain}:${config.port}/admindashboard?page=1`       
        res.render("userlist", {user: users, dashboardLink});
    } catch (error) {
        req.logger.error(error);
    };
};

export const renderProfile = async (req, res) => {
    try {
        const { user } = req.session;
        const userId = req.user._id;
        const isNotPremium = () => {
            if (user.role === "user") {
                return true;
            };
        };
        const dashboardLink = `http://${config.railway_public_domain}:${config.port}/products?page=1`;
        res.render("current", {user, dashboardLink, userId, isNotPremium});
    } catch (error) {
        req.logger.error(error);
    }
};

export const renderCart = async (req, res) => {
    try {
        const cartId = req.user.cart;
        const email = req.user.email;
        const cart = await getCartService(cartId);
        const dashboardLink = `http://${config.railway_public_domain}:${config.port}/products?page=1`;
        res.render("cart", {cart: cart, dashboardLink, email});
    } catch (error) {
        req.logger.error(error);
    };
};

export const recoverPassword = (req, res) => {
    try {
        res.render("recoverpassword");
    } catch (error) {
        req.logger.error(error);
    }
};

export const resetPassword = (req, res) => {
    try {
        const token = req.params.token;
       res.render("resetpassword", {token}); 
    } catch (error) {
        req.logger.error(error);
    }
};

export const renderMocks = (req, res) => {
    try {
        const products = generateProducts();
        res.render("home", {products});
    } catch (error) {
        req.logger.error(error);
    }
};