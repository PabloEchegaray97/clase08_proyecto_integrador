import { Router } from "express";
import { getUsers, getUser, createUser, userLogin } from "../controllers/users.controller.js";

const router = Router()

router.get('/', getUsers)
router.get('/user', getUser)
router.post('/', createUser)
router.post('/login', userLogin)

export default router