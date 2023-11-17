import {Router} from 'express'
import { getProducts, getProductById, createProduct, deleteProduct, updateProduct, productOwner } from '../controllers/products.controller.js'
import { authorization, passportCall } from "../utils.js";

const router = Router()

router.get('/', getProducts)
router.get('/:id', getProductById)
router.post('/', passportCall('jwt'), authorization('admin'), createProduct)
router.delete('/:id', passportCall('jwt'), authorization('admin'), deleteProduct)
router.put('/:id', passportCall('jwt'), authorization('admin'), updateProduct)
router.get('/:userId/:productId', productOwner)

export default router