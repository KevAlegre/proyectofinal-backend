import productModel from "./models/productModel.js";

export default class ProductsData {
    getProductsData = async (filter, options) => {
        const products = await productModel.paginate(filter, options);
        return products;
    };

    getProductByIdData = async (productId) => {
        const product = await productModel.findOne({_id: productId});
        return product;
    };

    existCode = async (code) => {
        const exist = await productModel.findOne({code: code});
        return exist;
    };

    createProductData = async (product) => {
        const newProduct = await productModel.create(product);
        return newProduct;
    };

    updateProductData = async (productId, productToReplace) => {
        const updateProduct = await productModel.updateOne({_id: productId}, productToReplace);
        return updateProduct;
    };

    deleteProductData = async (productId) => {
        const deleteProduct = await productModel.deleteOne({_id: productId});
        return deleteProduct;
    };
}