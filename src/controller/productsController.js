import {getProductsService, getProductByIdService, createProductService, updateProductService, deleteProductService} from "../services/productsServices.js";

export const getProducts = async (req, res) => {
    try {
        const {limit, page, sort, query} = req.query;
        const products = await getProductsService(limit, page, sort, query);
        res.send({status: "Success", payload: products});
        } catch (error) {
        res.send({status: "Error", message: "Error getting products"});
        req.logger.error(error);
    };
};

export const getProductById = async (req, res) => {
    try {
        const productId = req.params.pid;
        const product = await getProductByIdService(productId);
        res.send({status: "Success", payload: product});
    } catch (error) {
        res.send({status: "Error", message: "Product with ID entered does not exist"});  
        req.logger.error(error);
    }
};
export const createProduct = async (req, res) => {
    try {
        const {title, description, price, code, stock, category, thumbnail} = req.body;
        const newProduct = await createProductService(title, description, price, code, stock, category, thumbnail);
        res.send({status: "Success", payload: newProduct});
    } catch (error) {
        req.logger.error(error)
        res.send({status: "Error", message: error.message});
    };
};

export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        const productToReplace = req.body;
        const updatedProduct = await updateProductService(productId, productToReplace);
        res.send({status: "Success", payload: updatedProduct});
    } catch (error) {
        req.logger.error(error);
        res.send({status: "Error", message: error.message});
    };
};

export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        const deletedProduct = await deleteProductService(productId);
        res.send({status: "Success", payload: deletedProduct});
    } catch (error) {
        req.logger.error(error);
        res.send({status: "Error", message: error.message});
    };
};