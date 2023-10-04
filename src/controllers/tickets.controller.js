import { ticketService } from '../services/index.js'

export const getTickets = async (req, res) => {
    const result = await ticketService.getTickets()
    res.send({
        status: 'success', payload: result
    })
}

export const getTicketByCode = async (req, res) => {
    const {code} = req.params
    const result = await ticketService.getTicketByCode(code)
    res.send({
        status: 'success', payload: result
    })
}

export const createTicket = async (req, res) => {
    const newTicket = req.body
    const result = await ticketService.createTicket(newTicket)
    res.send({
        status: 'success', payload: result
    })
}

