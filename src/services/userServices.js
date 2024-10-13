import { UserData } from "../DAO/factory.js";
import { hashedToken } from "../utils.js";
import { transport } from "./mailingServices.js";

const userData = new UserData();

export const getUser = async (id) => {
    const user = await userData.getUser(id);
    return user;
};

export const getUsersService = async () => {
    const users = await userData.getUsers();
    const data = users.map((user) => {
        return {
            usuario: `${user.first_name} ${user.last_name}`,
            email: user.email,
            rol: user.role
        }
    });
    return data;
};

export const getUserEmail = async (email) => {
    const user = await userData.getUserDataEmail(email);
    return user;
};

export const setTokenUser = async (token, user) => {
    user.resetToken = await hashedToken(token);
    user.tokenExpiration = Date.now() + 3600000;
    await user.save();
};

export const existToken = async () => {
    const token = userData.existToken();
    return token;
};

export const deleteUser = async (email) => {
    const user = await userData.deleteUser(email);
    return user;
};

export const deleteInactiveUsers = async () => {
    const now = new Date();
    const inactivity = now.setDate(now.getDate() - 2);
    const inactiveUsers = await userData.getInactiveEmails(inactivity);
    const inactiveEmails = inactiveUsers.map((user) => user.email);
    if (inactiveEmails) {
        const mailing = await transport.sendMail({
            from: '"TestMail" <mail-prueba@gmail.com>',
            to: inactiveEmails,
            subject: "Tu cuenta ha sido eliminada por inactividad",
            html: `
            <div>
            <p>Tu cuenta ha sido eliminada de nuestro sistema ya que detectamos que no has iniciado sesión en más de dos días, lamento lo sucedido.</p>
            </div>
            `,
            attachments: []
        });
    };
    if (inactiveEmails) {
        const result = await userData.deleteInactiveUsers(inactivity);
        return "Usuarios eliminados y notificados correctamente";
    } else {
        return "No existen usuarios inactivos por el plazo configurado";
    };
};