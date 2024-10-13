import { Router } from "express";
import {createCart, getCart, addToCart, removeFromCart, updateQuantity, clearCart, purchaseCart} from "../controller/cartsController.js";

const cartsRouter = Router();

cartsRouter.post("/", createCart);
cartsRouter.get("/:cid", getCart);
cartsRouter.post("/:cid/products/:pid", addToCart);
cartsRouter.delete("/:cid/products/:pid", removeFromCart);
cartsRouter.put("/:cid/products/:pid", updateQuantity);
cartsRouter.delete("/:cid", clearCart);
cartsRouter.post("/:cid/purchase" ,purchaseCart);

export default cartsRouter;