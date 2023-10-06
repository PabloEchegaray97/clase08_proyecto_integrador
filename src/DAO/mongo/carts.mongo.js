import CartModel from './models/cart.model.js'
export default class Cart {
    getCarts = async () => {
        return await CartModel.find() 
    }
    getCart = async (id) => {
        return await CartModel.findOne({_id: id})
    }
    createCart = async (cart) => {
        return await CartModel.create(cart)
    }
    
}