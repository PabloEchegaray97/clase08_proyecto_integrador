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
    cartPurchase = async (cid) => {
        const cart = await this.dao.getCart(cid);
        const total = 0
        const checkedProducts = cart.products.map((product, index) => {
            console.log(`Producto ${index + 1}:`);
            console.log(`Nombre: ${product.product.name}`);
            console.log(`Precio: ${product.product.price}`);
            console.log(`Cantidad en stock: ${product.product.quantity}`);
            console.log(`Cantidad en carrito: ${product.quantity}`);
            console.log('---');
            if (product.quantity > product.product.quantity) { //retornar los productos que tienen una cantidad solicitada mayor a la existente
                total = product.product.price * product.quantity + total
                return product;
            } else {
                return null;
            }
        }).filter(product => product !== null); // Filtramos los productos que no cumplieron el criterio
        if (checkedProducts.length > 0) {
            return checkedProducts
        }
        return {total}
    };

    addProductToCart = async (cid, productId, quantity) => {
        return await this.dao.addProductToCart(cid, productId, quantity)
    }

    deleteProductFromCart = async (cid, productId) => {
        return await this.dao.deleteProductFromCart(cid, productId)
    }
}