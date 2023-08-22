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
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: '/'}),
    async(req, res) => {
        console.log('Callback: ', req.user)
        req.session.user = req.user
        console.log(req.session)
        res.redirect('/profile')
    }
)
export default router