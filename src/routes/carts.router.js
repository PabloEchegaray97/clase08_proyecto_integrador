import {Router} from 'express'
import { getCarts, getCart, createCart, checkoutCart } from '../controllers/carts.controller.js'

const router = Router()

router.get('/', getCarts)
router.get('/:cid', getCart)
router.post('/', createCart)
router.get('/test/:cid', checkoutCart)

export default router