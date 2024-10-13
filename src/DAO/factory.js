import config from "../config/config.js";
import mongoose from "mongoose";

export let CartsData;
export let ProductsData;
export let TicketsData;
export let UserData;

switch (config.persistence) {
  case "MONGO":
    mongoose.connect(config.mongo_url);
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", () => {
      console.log("Conectado a la base de datos");
    });

    const {default: CartsDataMongo} = await import("./mongo/cartsData.js");
    const {default: ProductsDataMongo} = await import("./mongo/productsData.js");
    const {default: TicketDataMongo} = await import("./mongo/ticketsData.js");
    const {default: UserDataMongo} = await import("./mongo/userData.js");

    CartsData = CartsDataMongo;
    ProductsData = ProductsDataMongo;
    TicketsData = TicketDataMongo;
    UserData = UserDataMongo;
    break;
};
