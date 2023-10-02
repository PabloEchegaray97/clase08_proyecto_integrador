import { chatService } from '../services/index.js'

export const getChats = async (req, res) => {
    const result = await chatService.getChats()
    res.send({
        status:'success',
        payload: result
    })
}

export const getChat = async (req, res) => {
    const {chid} = req.params
    const result = await chatService.getChat(chid)
    res.send({
        status:'success', 
        payload: result
    })
}

export const createChat = async (req, res) => {
    const chat = req.body
    const result = await chatService.createChat(chat)
    res.send({
        status: 'success',
        payload: result
    })
}