import CartDTO from '../DAO/DTO/cart.dto.js'
import { deleteProductFromCart } from '../controllers/carts.controller.js'

export default class CartRepository {
    constructor(dao) {
        this.dao = dao
    }

    getCarts = async () => {
        return await this.dao.getCarts()
    }
    getCart = async (cid) => {
        return await this.dao.getCart(cid)
    }
    createCart = async (cart) => {
        const newCart = new CartDTO(cart)
        return await this.dao.createCart(newCart)
    }
    reduceQuantity = async (pid, quantity) => {
        return await this.dao.reduceQuantity(pid, quantity)
    }
    cartPurchase = async (cid) => {
        const cart = await this.dao.getCart(cid);
        let total = 0
        const productsNotAvailable = []
        const productsAvailable = []
        const checkedProducts = cart.products.map((product, index) => {
            if (product.quantity < product.product.quantity) { // los productos que disponen de la cantidad pedida pasan
                total = product.product.price * product.quantity + total
                productsAvailable.push(product) // se pushean al array el producto disponible
                return product;
            } else {
                productsNotAvailable.push(product) // se pushean los productos no disponibles
            }
        })
        const result = {productsAvailable, productsNotAvailable, total}
        return result
    }

    addProductToCart = async (cid, productId, quantity) => {
        return await this.dao.addProductToCart(cid, productId, quantity)
    }

    deleteProductFromCart = async (cid, productId) => {
        return await this.dao.deleteProductFromCart(cid, productId)
    }
}