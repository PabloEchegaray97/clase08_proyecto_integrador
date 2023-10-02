import {Router} from 'express'
import { getCarts, getCart, createCart } from '../controllers/carts.controller.js'

const router = Router()

router.get('/', getCarts)
router.get('/:cid', getCart)
router.post('/', createCart)

export default router