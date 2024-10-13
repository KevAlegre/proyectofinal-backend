import express from "express";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import bodyParser from "body-parser"
import socketManager from "./services/socketManager.js";
import cartsRouter from "./routes/carts.router.js"
import productsRouter from "./routes/products.router.js";
import sessionRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js"
import __dirname from "./utils.js";
import passport from "passport";
import initializePassport from "./config/passport.config.js";
import errorHandler from "./services/errorHandler.js"
import config from "./config/config.js";
import { addLogger } from "./services/loggerHandler.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

const app = express();
const PORT = config.port;

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documento de endpoints de ecommerce",
            description: "API de ecommerce"
        }
    },
    apis: [`src/docs/**/*.yaml`]
};
const specs = swaggerJsdoc(swaggerOptions);
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(__dirname + "/public"));

app.use(session({
    secret: config.mongo_secret_key,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: config.mongo_url}),
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler);
app.use(addLogger);

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/users", usersRouter);
app.use("/", viewsRouter);

app.get("/loggertest", (req, res) => {
    req.logger.fatal(`[${new Date().toLocaleTimeString()}] - Problema en ${req.url}`);
    req.logger.error(`[${new Date().toLocaleTimeString()}] - Problema en ${req.url}`);
    req.logger.warning(`[${new Date().toLocaleTimeString()}] - Tener cuidado en ${req.url}`);
    req.logger.info(`[${new Date().toLocaleTimeString()}] - ¡Que tengas un lindo día!`);
    req.logger.http(`[${new Date().toLocaleTimeString()}] - Estamos ubicados en la ruta ${req.url}`);
    req.logger.debug(`[${new Date().toLocaleTimeString()}] - Debug en ${req.url}`);
    
    res.send({message: "Prueba de logger - endpoint con los logs en el archivo app.js, línea 52"});
});

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
const socketServer = new Server(httpServer);
socketManager(socketServer);