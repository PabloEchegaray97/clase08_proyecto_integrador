import {Router} from 'express'
import { getTickets, getTicketByCode, createTicket } from '../controllers/tickets.controller.js'

const router = Router()

router.get('/', getTickets)
router.get('/:code', getTicketByCode)
router.post('/', createTicket)

export default router