import {Router} from 'express';
import passport from "passport";
import { generateToken } from "../utils.js";

const router = Router();

// Registro
router.post(
    '/register',
    passport.authenticate('register', { failureRedirect: '/register', }),
    async (req, res) => {
        res.redirect('/')
    }
)

router.get('/logout', (req, res) => {
    res.clearCookie('coderCookie');
    res.redirect('/');
});


// GITHUB
router.get(
    '/login-github',
    passport.authenticate('github', {scope: ['user:email'] })
)

router.get(
    '/ghcallback',
    passport.authenticate('github', { failureRedirect: '/'}),
    async (req, res) => {
        if (!req.user) {
            return res.status(401).send('Authentication failed');
        }
        const jwtToken = generateToken(req.user);
        res.cookie('coderCookie', jwtToken, {
            maxAge: 24 * 60 * 60 * 1000, // 24 horas
            httpOnly: true,
        });
        res.redirect('/profile');
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