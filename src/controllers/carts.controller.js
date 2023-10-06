//cambiar id al generar carrito dependiendo de la persistencia, usar getNextID
import {cartService} from '../services/index.js'
import { ticketService } from '../services/index.js'
export const getCarts = async (req, res) => {
    const result = await cartService.getCarts()
    res.send({
        status:'success',
        payload: result
    })
}

export const getCart = async (req, res) => {
    const {cid} = req.params
    const result = await cartService.getCart(cid)
    res.send({
        status: 'success',
        payload: result
    })
}

export const createCart = async (req, res) => {
    const result = await cartService.createCart({products: []})
    res.send ({
        status: 'success',
        payload: result
    })
}
export const checkoutCart = async (req, res) => {
    const {cid} = req.params
    const result = await cartService.checkoutCart(cid)
    
    if (result == true) {
        const newTicket = ticketService.createTicket()
    }
    res.send({
        status: 'success', 
        payload: result
    })
}