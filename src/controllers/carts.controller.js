//cambiar id al generar carrito dependiendo de la persistencia, usar getNextID
import { cartService, ticketService, productService} from '../services/index.js'

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
    const { cid } = req.params;
    const result = await cartService.cartPurchase(cid);
    const cart = await cartService.getCart(cid);
    console.log(cart.products);
    console.log(result.productsNotAvailable);
    const user = req.user.user.email;
    if (result.productsNotAvailable.length === 0) {
        for (const product of cart.products) {
            const productModified = {
                ...product.product,
                quantity: product.product.quantity - product.quantity
            };
            await productService.updateProduct(product.product._id, productModified); //reducir la cantidad del producto
        }
        const newTicket = await ticketService.createTicket({ purchaser: user, total: result.total }); // agregar a usuario
        return res.send({ status: 'success', payload: newTicket });
    }
    res.send({ status: 'not modified', payload: result.productsNotAvailable });
};


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