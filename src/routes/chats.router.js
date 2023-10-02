import { Router } from "express";
import { getChat, getChats, createChat } from "../controllers/chats.controller.js";

const router = Router()

router.get('/', getChats)
router.get('/:chid', getChat)
router.post('/', createChat)

export default router