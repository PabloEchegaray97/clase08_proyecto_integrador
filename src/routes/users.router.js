import { Router } from "express";
import { getUsers, getUser, createUser, userLogin, userRegister, getAdminPanel } from "../controllers/users.controller.js";
import { authorization, passportCall } from "../utils.js";
import passport from "passport";
import CustomError from "../services/errors/custom_error.js";
import { generateUserErrorInfo } from "../services/errors/info.js";
import EErrors from "../services/errors/enums.js";

const router = Router()

// router.get('/', getUsers) 
router.get('/user', getUser)
router.post('/', createUser)
router.post('/login', userLogin)
router.post('/register', passport.authenticate('register', { failureRedirect: '/register', }), userRegister)
router.get('/admin', passportCall('jwt'), authorization('admin'), getAdminPanel) // loguearse como admin 

export default router