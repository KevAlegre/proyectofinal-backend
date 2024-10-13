import productModel from "./models/productModel.js";
import userModel from "./models/userModel.js";

export default class UserData {
    getUser = async (id) => {
        const user = await userModel.findOne({_id: id});
        return user;
    };
    getUsers = async () => {
        const users = await userModel.find().lean();
        return users;
    };
    getUserDataEmail = async (email) => {
        const user = await userModel.findOne({email: email});
        return user;
    };
    existToken = async () => {
        const token = await userModel.findOne({
            resetToken: {$exists: true}
        });
        return token;
    };
    updateUser = async (email, data) => {
        const updateUser = await productModel.updateOne({email: email}, data);
        return updateUser;
    };
    getInactiveEmails = async (inactivity) => {
        const inactiveUsers = await userModel.find({last_connection: {$lt: inactivity}});
        return inactiveUsers;
    };
    deleteUser = async (email) => {
        const deleteUser = await userModel.deleteOne({email: email});
        return deleteUser;
    };
    deleteInactiveUsers = async (inactivity) => {
        const result = await userModel.deleteMany({last_connection: {$lt: inactivity}});
        return result
    };
};