import { Router } from 'express';
import cloudProductManager from '../DAO/mongoManager/controllers/product.manager.js';
import CartModel from '../DAO/mongoManager/models/cart.model.js';
import { passportCall } from '../utils.js';
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

router.get('/profile', (req, res, next) => {
    const cookie = req.cookies['coderCookie'];

    if (!cookie) {
        return res.redirect('/login'); // Redirige a la página de inicio de sesión si no hay cookie
    }

    // Verifica la cookie y realiza la lógica JWT aquí, si es necesario.
    passportCall('jwt')(req, res, (err) => {
        if (err) {
            return res.redirect('/login'); // Redirige si la verificación JWT falla
        }
        // Si todo está en orden, pasa al siguiente middleware o controlador.
        next();
    });
}, (req, res) => {
    // Esta parte solo se ejecutará si la cookie es válida y el JWT es válido.
    const user = req.user.user;
    res.render('profile', user);
});

router.get('/login', (req, res) => {
    res.render('login-jwt', {})
})

router.get('/home', (req, res) => {
    res.render('home', {})
})


export default router;