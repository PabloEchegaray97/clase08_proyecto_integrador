//cambiar id al generar carrito dependiendo de la persistencia, usar getNextID
import { cartService} from '../services/index.js'
import { ticketService } from '../services/index.js'

export const getCarts = async (req, res) => {
    const result = await cartService.getCarts()
    res.send({ status: 'success', payload: result })
}

export const getCart = async (req, res) => {
    const { cid } = req.params
    const result = await cartService.getCart(cid)

    res.send({ status: 'success', payload: result })
}

export const createCart = async (req, res) => {
    const result = await cartService.createCart({ products: [] })
    res.send({ status: 'success', payload: result })
}
export const cartPurchase = async (req, res) => {
    const { cid } = req.params
    const result = await cartService.cartPurchase(cid)
    console.log(result);
    const user = req.user.user.email
    if (typeof result.total == "number") {
        const newTicket = await ticketService.createTicket({ purchaser: user, total: result }) //agregar a usuario 
        return res.send({ status: 'success', payload: newTicket })
    }
    res.send({ status: 'success', payload: result })
}

export const addProductToCart = async (req, res) => {
    const { cid, productId } = req.params
    const quantity = req.query.quantity || 1
    const result = await cartService.addProductToCart(cid, productId, quantity)
    
    res.send({ status: 'success', payload: result })
}

export const deleteProductFromCart = async (req, res) => {
    const { cid, productId } = req.params
    const result = await cartService.deleteProductFromCart(cid, productId)

    res.send({ status: 'success', payload: result })
}