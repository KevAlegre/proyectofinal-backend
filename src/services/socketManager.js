import { createProductService, deleteProductService } from "./productsServices.js";
import { addToCartService } from "./cartsServices.js";
import { getProductByIdService } from "./productsServices.js";
import { createTicketService } from "./ticketsServices.js";
import { setTokenUser, existToken, getUserEmail, deleteUser } from "./userServices.js";
import { generateToken, isValidToken, createHash, isValidPassword } from "../utils.js";
import { transport } from "./mailingServices.js";
import config from "../config/config.js";

const socketManager = (socketServer) => {
    socketServer.on("connection", (socket) => {
        console.log("Cliente conectado");

        //Admin & Premium options
        socket.on("newProduct", async (data) => {
            data.price = parseInt(data.price);
            data.stock = parseInt(data.stock); 
            await createProductService(data);
        });
        socket.on("deleteProduct", async (data) => {
            const user = await getUserEmail(data.email);
            const product = await getProductByIdService(data.productId);
            const owner = product.owner;       
            if (user.role === "admin") {
                const mailing = await transport.sendMail({
                    from: '"TestMail" <mail-prueba@gmail.com>',
                    to: owner,
                    subject: "Tu producto fue eliminado",
                    html: `
                    <div>
                        <p>Tu producto fue eliminado por el administrador, lamentamos las molestias.</p>
                    </div>
                    `,
                    attachments: []
                });
                await deleteProductService(data.productId);
            };
            if (user.role === "premium") {
                if (owner === data.email) {
                    await deleteProductService(data.productId);
                } else {
                    console.log("No se pueden eliminar productos que no son de nuestra propiedad");
                };
            };
        });
        socket.on("userHandler", async (data) => {
            const user = await getUserEmail(data.email);
            if (data.email !== config.admin_mail) {
                if (data.action === "setUser") {
                    user.role = "user";
                    console.log("Rol cambiado correctamente, actualizar la página");
    
                    await user.save();
                };
                if (data.action === "setPremium") {
                    user.role = "premium";
                    console.log("Rol cambiado correctamente, actualizar la página");
                    await user.save();
                    
                };
                if (data.action === "deleteUser") {
                    console.log("Usuario eliminado correctamente del sistema, actualizar la página");
                    await deleteUser(data.email);
                };
            } else {
                console.log("No se pueden ejecutar los procesos en la cuenta del administrador");
            };
        });

        //User options
        socket.on("addToCart", async (cartId, productId) => {
            await addToCartService(cartId, productId);
        });
        socket.on("dataTicket", async (prices, email) => {
            await createTicketService(prices, email);
        });
        socket.on("sendMail", async (email) => {
            const user = await getUserEmail(email);
            if (!user) {
                console.log("Mail inexistente");
            } else {
                const token = generateToken();
                setTokenUser(token, user);
                const mailing = await transport.sendMail({
                    from: '"TestMail" <mail-prueba@gmail.com>',
                    to: email,
                    subject: "Recupero de contraseña",
                    html: `
                    <div>
                        <p>Para continuar con el proceso, porfavor presione el siguiente botón que lo redireccionará a la página para restablecer su contraseña</p>
                        <a href="http://localhost:8080/resetpassword/${token}" target="_blank"><button>Restablecer contraseña</button></a>
                    </div>
                    `,
                    attachments: []
                });   
            }
        });

        socket.on("resetPassword", async (data) => {  
            const user = await existToken();      
            const token = data.token;
            if (!user || !(isValidToken(user, token))) {
                return console.log("Token inválido o expirado");
            };
            if (data.newPass === data.repeatPass) {
                const hashedPassword = createHash(data.newPass);
                console.log(user);               
                if (isValidPassword(user, data.newPass)) return console.log("No se puede volver a utilizar la última contraseña registrada.");
                user.password = hashedPassword;
                user.resetToken = undefined;
                user.tokenExpiration = undefined;
                await user.save();            
            } else {
                console.log("Las contraseñas no coinciden");
            };
        });
    });
};

export default socketManager;