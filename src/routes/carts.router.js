import {Router} from 'express'
import { getCarts, getCart, createCart, cartPurchase, addProductToCart, deleteProductFromCart } from '../controllers/carts.controller.js'
import { passportCall } from "../utils.js";

const router = Router()

router.get('/', getCarts)
router.get('/:cid', getCart)
router.post('/', createCart)
router.get('/:cid/purchase', passportCall('jwt'), cartPurchase)
router.get('/:cid/products/:productId', addProductToCart)
router.delete('/:cid/products/:productId', deleteProductFromCart)
export default router