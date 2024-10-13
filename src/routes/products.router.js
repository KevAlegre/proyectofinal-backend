import { Router } from "express";
import {getProducts, getProductById, createProduct, updateProduct, deleteProduct} from "../controller/productsController.js";

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:pid", getProductById);
productsRouter.post("/", createProduct);
productsRouter.put("/:pid", updateProduct);
productsRouter.delete("/:pid", deleteProduct);

export default productsRouter;