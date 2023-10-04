import TicketModel from "./models/ticket.model.js";

export default class Ticket {
    getTickets = async () => {
        return await TicketModel.find()
    }
    getTicketByCode = async (code) => {
        return await TicketModel.findOne({code}).lean.exec()
    }
    createTicket = async (ticket) => {
        return await TicketModel.create(ticket)
    }
}