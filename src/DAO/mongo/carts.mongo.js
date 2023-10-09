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

    addProductToCart = async (cid, productId, quantity) => {
        let cart = await CartModel.findOne({_id: cid}).populate('products.product')
        console.log(quantity);
        const productIndex = cart.products.findIndex(
            (product) => product.product._id.toString() === productId
        )
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity: quantity });
        }
        cart = await cart.save();
        return cart
    }

    deleteProductFromCart = async (cid, productId) => {
        let cart = await this.getCart(cid)
        console.log(cid);
        console.log(productId);
        console.log(cart.products[0].id);
        const productIndex = cart.products.findIndex(
            (p) => p.product._id.toString() == productId
        );
        
        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            cart = await cart.save()
        }
        return cart
    }
}