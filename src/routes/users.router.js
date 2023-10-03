import { Router } from "express";
import { getUsers, getUser, createUser, userLogin, userRegister } from "../controllers/users.controller.js";
import passport from "passport";


const router = Router()

router.get('/', getUsers)
router.get('/user', getUser)
router.post('/', createUser)
router.post('/login', userLogin)
router.post('/register', passport.authenticate('register', { failureRedirect: '/register', }), userRegister)

export default router