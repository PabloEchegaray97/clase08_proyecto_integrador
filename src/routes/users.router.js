import { Router } from "express";
import { getUsers, getUser, createUser, userLogin, userRegister, getAdminPanel, sendMail } from "../controllers/users.controller.js";
import { authorization, passportCall } from "../utils.js";
import passport from "passport";

const router = Router()

// router.get('/', getUsers) 
// router.get('/user', getUser)
router.post('/', createUser)
router.post('/login', userLogin)
router.post('/register', passport.authenticate('register', { failureRedirect: '/register', }), userRegister)
router.get('/admin', passportCall('jwt'), authorization('admin'), getAdminPanel) // loguearse como admin 
router.post('/testmail', sendMail)

export default router