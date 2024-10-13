import { TicketsData } from "../DAO/factory.js";
import { createAt } from "./dateServices.js";

const ticketsData = new TicketsData();

export const getTicketService = async (email) => {
    const ticket = await ticketsData.getTicket(email)
    return ticket;
};

export const createTicketService = async (prices, email) => {
    const date = createAt();
    const amount = prices.reduce((acc, prev) => acc + prev, 0);
    await ticketsData.createTicket(date, amount, email);
    const ticket = await getTicketService(email);
    return ticket;
};