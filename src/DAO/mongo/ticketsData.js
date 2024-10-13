import ticketModel from "./models/ticketModel.js";

export default class TicketsData{
    createTicket = async (date, amount, email) => {
        const ticket = {
            purchase_datetime: date,
            amount: amount,
            purchaser: email
        };
        await ticketModel.create(ticket);
    };

    getTicket = async (email) => {
        const ticket = await ticketModel.findOne({purchaser: email});
        const getTicket = {
            code: ticket._id,
            purchase_datetime: ticket.purchase_datetime,
            amount: ticket.amount,
            purchaser: ticket.purchaser
        };
        return getTicket;
    };
};