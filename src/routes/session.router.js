import {Router} from 'express';
import UserModel from './../DAO/mongoManager/models/user.model.js';
import passport from "passport";
import { createHash, isValidPassword } from "../utils.js";

const router = Router();

// Iniciar Session
router.post('/login', passport.authenticate('login', '/login'), async (req, res) => {

    if (!req.user) return res.status(400).send('Invalid Credentials')
    req.session.user = req.user

    return res.redirect('/profile')
})


// Registro
router.post(
    '/register',
    passport.authenticate('register', { failureRedirect: '/register', }),
    async (req, res) => {
        res.redirect('/')
    }
)

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
        } else {
            res.redirect('/');
        }
    });
});


// GITHUB
router.get(
    '/login-github',
    passport.authenticate('github', {scope: ['user:email'] })
)

router.get(
    '/ghcallback',
    passport.authenticate('github', { failureRedirect: '/'}),
    async(req, res) => {
        console.log('Callback: ', req.user)
        req.session.user = req.user
        console.log(req.session)
        res.redirect('/profile')
    }
)

function auth(req, res, next) {
    if(req.session?.user.role == 'admin') return next()
    return res.status(401).send('No tienes acceso a esta pagina')
}

router.get('/admin', auth, (req,res) => {
    res.send('Esto solo lo puede ver un usuario que sea administrador')
    console.log(req.session.user.role);
})
export default router