import { Router } from 'express';
import cloudProductManager from '../DAO/mongoManager/controllers/product.manager.js';

const router = Router();

router.get('/create-product', async (req, res) => {
    res.render('create', {})
})

router.get('/products', async (req, res) => {
    const result = await cloudProductManager.listProducts(req);
    res.render('list', result );

})

router.get('/product-detail/:id', async (req, res) => {
    const product = await cloudProductManager.getProduct(req);
    res.render('one', product)
})
export default router;