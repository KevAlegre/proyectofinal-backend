import mongoose from "mongoose";

const messageCollection = "Message";

const messageSchema = new mongoose.Schema({
    user: {type: String, require: true},
    message: {type: String, require: true},
    date: {type: Date}
});

const messageModel = mongoose.model(messageCollection, messageSchema);

export default messageModel;