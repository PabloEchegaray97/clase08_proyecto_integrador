import CartDTO from '../DAO/DTO/cart.dto.js'

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
}