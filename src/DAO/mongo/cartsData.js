import cartModel from "./models/cartModel.js";

export default class CartsData {
    createCartData = async () => {
        const createCart = await cartModel.create({});
        return createCart;
    };

    existCart = async (cartId) => {
        const verifyId = cartModel.findOne({_id: cartId});
        return verifyId;
    };

    getCartData = async (cartId) => {
        const cart = await cartModel.findOne({_id: cartId}).populate("products.product").lean();
        return cart;
    };

    updateCartData = async (cartId, cart) => {
        const updateCart = await cartModel.updateOne({_id: cartId}, cart);
        return updateCart;
    };
};