import {fileURLToPath} from "url";
import path from "path";
import { dirname } from "path";
import multer from "multer";
import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";
import crypto from "crypto";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === "profile") {
            cb(null, __dirname + "/files/profiles");
        } else if (file.fieldname === "product") {
            cb(null, __dirname + "/files/products");
        } else if (file.fieldname === "document") {
            cb(null, `${__dirname}/files/documents`);
        } else {
            cb(new Error("Archivo no soportado"), false);
        };
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}-${file.originalname}`);
    }
});

export const uploader = multer({storage});

export const generateToken = () => {
    const token = crypto.randomBytes(32).toString("hex");
    return token;
};
export const hashedToken = async (token) => {
    const hashToken = await bcrypt.hash(token, 10);
    return hashToken;
};
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const isValidToken = (user, token) => bcrypt.compareSync(token, user.resetToken);

export const generateProducts = () => {
    const products = [];
    for(let i = 0; i < 101; i += 1) {
        const newProduct = {
            title: faker.commerce.product(),
            code: i + 1,
            category: "Mock",
            description: faker.commerce.productAdjective(),
            price: faker.commerce.price({ min: 100, max: 200, dec: 0 })
        };
        products.push(newProduct);
    };
    return products;
};

export default __dirname;