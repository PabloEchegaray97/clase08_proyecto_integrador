import { Router } from 'express';
import CartModel from '../DAO/mongo/models/cart.model.js';

const router = Router();

router.get('/:cartId/products/:productId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        const quantity = req.query.quantity || 1;

        let cart = await CartModel.findById(cartId).populate('products.product');
        const productIndex = cart.products.findIndex(
            (product) => product.product._id.toString() === productId
        );

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity: quantity });
        }

        cart = await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).send('Error adding product to cart');
    }
});


router.delete('/:cartId/products/:productId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        let cart = await CartModel.findById(cartId);
        const productIndex = cart.products.findIndex(
            (product) => product.id == productId
        );
        if (productIndex !== -1) {
            cart.products.splice(productIndex, 1);
            cart = await cart.save()
            res.status(200).send(cart);
        } else {
            res.status(200).send('Not modified')
        }
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).send('Error deleting product')
    }
})
router.delete('/:cartId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        let cart = await CartModel.findById(cartId);
        cart.products = [];
        cart = await cart.save();
        res.status(200).send(cart);
    } catch (error) {
        console.error('Error deleting products from cart');
        res.status(500).send('Error deleting products from cart ')
    }
})
router.put('/:cartId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const updatedCart = req.body;
        let cart = await CartModel.findById(cartId);
        if (!cart) {
            return res.status(404).send('Cart not found');
        }
        cart.products = updatedCart.products;
        cart = await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.error('Error updating cart:', error)
        res.status(500).send('Error updating cart')
    }
})

router.put('/:cartId/products/:productId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        const { quantity } = req.body;
        let cart = await CartModel.findById(cartId);
        if (!cart) {
            return res.status(404).send('Cart not found');
        }
        const productIndex = cart.products.findIndex(
            (product) => product.id === productId
        );
        if (productIndex !== -1) {
            cart.products[productIndex].quantity = quantity;
            cart = await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404).send('Product not found')
        }
    } catch (error) {
        console.error('Error updating product quantity:', error);
        res.status(500).send('Error updating product quantity');
    }
})
router.delete('/:cartId', (req, res) => {

})
router.post('/', async (req, res) => {
    try {
        const cart = await CartModel.create({ products: [] });
        res.status(201).json(cart);
    } catch (error) {
        console.error('Error creating new cart:', error);
        res.status(500).send('Error creating new cart');
    }
});

export default router;
