import { CartsData } from "../DAO/factory.js";
import { getProductByIdService } from "./productsServices.js";

const cartsData = new CartsData();

export const createCartService = async () => {
    const newCart = await cartsData.createCartData();
    return newCart;
};

export const getCartService = async (cartId) => {
    const verifyId = await cartsData.existCart(cartId);
    if(!verifyId) throw new Error("Cart with ID entered does not exist");
    const cart = await cartsData.getCartData(cartId);
    return cart;
};

export const addToCartService = async (cartId, productId) => {
    const cart = await getCartService(cartId);
    if(!cart) return;
    const product = await getProductByIdService(productId);
    if(!product) throw new Error("Product with ID entered does not exist");
    cart.products.push({product: productId});
    const updateCart = await cartsData.updateCartData(cartId, cart);
    return updateCart;
};

export const removeFromCartService = async (cartId, productId) => {
    const cart = await getCartService(cartId);
    if(!cart) return;
    const product = await getProductByIdService(productId);
    if(!product) throw new Error("Product with ID entered does not exist");
    const index = cart.products.findIndex((product) => product.id === productId);
    cart.products.splice(index, 1);
    const updateCart = await cartsData.updateCartData(cartId, cart);
    return updateCart;
};

export const updateQuantityService = async (cartId, productId, quantity) => {
    const cart = await getCartService(cartId);
    if(!cart) return;
    const product = await getProductByIdService(productId);
    if(!product) throw new Error("Product with ID entered does not exist");
    const index = cart.products.find((product) => product.id === productId);
    const valueQuantity = Object.values(quantity);
    index.quantity = valueQuantity[0];
    console.log(valueQuantity);
    const updateCart = await cartsData.updateCartData(cartId, cart);
    return updateCart;
};

export const clearCartService = async (cartId) => {
    const cart = await getCartService(cartId);
    if(!cart) return;
    cart.products = [];
    const updateCart = await cartsData.updateCartData(cartId, cart);
    return updateCart;
};