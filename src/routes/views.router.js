import { Router } from 'express';
import cloudProductManager from '../DAO/mongoManager/controllers/product.manager.js';
import CartModel from '../DAO/mongoManager/models/cart.model.js';

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

router.get('/carts', async (req, res) => {
    try {
        const carts = await CartModel.find().lean().exec();
        res.render('carts', { carts })
    } catch (error) {
        console.error('Error fetching carts from the database:', error);
        res.status(500).send('Error fetching carts from the database');
    }
});


router.get('/', (req, res) => {
    if (req.session?.user) {
        res.redirect('/profile');
    } else {
        res.render('login');
    }
});

router.get('/register', (req, res) => {
    if (req.session?.user) {
        res.redirect('/profile');
    } else {
        res.render('register');
    }
});


function auth(req, res, next) {
    if(req.session?.user) return next()
    res.redirect('/')
}

router.get('/profile', auth, (req, res) => {
    const user = req.session.user
    res.render('profile', user)
})
export default router;