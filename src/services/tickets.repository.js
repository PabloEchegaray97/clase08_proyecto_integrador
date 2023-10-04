import TicketDTO from "../DAO/DTO/ticket.dto.js";

export default class TicketRepository {
    constructor(dao) {
        this.dao = dao
    }
    getTickets = async () => {
        return await this.dao.getTickets()
    }
    getTicketByCode = async (code) => {
        return await this.dao.getTicketByCode(code)
    }
    createTicket = async (ticket) => {
        const newTicket = new TicketDTO(ticket)
        return await this.dao.createTicket(newTicket)
    }
}