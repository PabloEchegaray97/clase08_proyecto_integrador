import { Router } from "express";
import { getUsers, getUser, createUser } from "../controllers/users.controller.js";

const router = Router()

router.get('/', getUsers)
router.get('/user', getUser)
router.post('/', createUser)

export default router