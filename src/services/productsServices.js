import { ProductsData } from "../DAO/factory.js";
import CustomError from "./CustomError/customError.js";
import EErrors from "./CustomError/dictionary.js";
import { error_invalidProductsParams } from "./CustomError/info.js";

const productsData = new ProductsData();

export const getProductsService = async (limit, page, sort, query) => {
    const filter = query ? {category: query} : {};
    const options = {
        limit: limit || 10,
        page: page || 1,
        sort: sort ? {price: sort === "asc" ? 1 : -1} : {},
        lean: true
    };
    const getProducts = await productsData.getProductsData(filter, options);
    getProducts.docs.map((prod) => {
        if (!prod.owner) {
            prod.owner = "Admin";
        };
    });
    return getProducts;
};

export const getProductByIdService = async (productId) => {
    const product = await productsData.getProductByIdData(productId);
    return product;
};

export const createProductService = async ({title, description, price, code, stock, category, thumbnail, owner}) => {
    if(!title || !description || !price || !code || !stock || !category) {
        CustomError.createError({
            name: "Product creation error",
            cause: error_invalidProductsParams(title, description, price, code, stock, category, thumbnail),
            message: "Error trying to create a product",
            code: EErrors.INVALID_PRODUCTS_PARAMS
        });
    };
    const verifyCode = await productsData.existCode(code);
    if(verifyCode) throw new Error("Assigned code already exists");
    const newProduct = {
        title: title,
        description: description,
        price: price,
        code: code,
        stock: stock,
        category: category,
        thumbnail: thumbnail,
        owner: owner || "Admin"
    };
    const product = await productsData.createProductData(newProduct);
    return product;
};

export const updateProductService = async (productId, productToReplace) => {
    const verifyId = await getProductByIdService(productId);
    if(!verifyId) throw new Error("Product with ID entered does not exist");
    const updatedProduct = await productsData.updateProductData(productId, productToReplace);
    return updatedProduct
};

export const deleteProductService = async (productId) => {
    const verifyId = await getProductByIdService(productId);
    if(!verifyId) throw new Error("Product with ID entered does not exist");
    const deletedProduct = await productsData.deleteProductData(productId);
    return deletedProduct;
};