import { Router } from 'express';
import CartModel from '../DAO/mongoManager/models/cart.model.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const carts = await CartModel.find();
        res.status(200).json(carts);
    } catch (error) {
        console.error('Error fetching carts from the database:', error);
        res.status(500).send('Error fetching carts from the database');
    }
});

router.get('/:cartId/:productId', async (req, res) => {
    try {
        const cartId = req.params.cartId;
        const productId = req.params.productId;
        const quantity = req.query.quantity || 1;

        let cart = await CartModel.findById(cartId);
        const productIndex = cart.products.findIndex(
            (product) => product.id === productId
        );
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ id: productId, quantity });
        }

        cart = await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).send('Error adding product to cart');
    }
});

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
