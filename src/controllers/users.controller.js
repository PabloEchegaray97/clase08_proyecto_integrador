import { userService } from "../services/index.js"

export const getUsers = async (req, res) => {
    const result = await userService.getUsers()
    res.send({ status: 'success', payload: result })
}

export const getUser = async (req, res) => {
    const user = req.body
    const result = await userService.getUser(user)
    res.send({ status: 'success', payload: result })
}

export const createUser = async (req, res) => {
    const user = req.body
    const result = await userService.createUser(user)
    res.send({ status: 'success', payload: result })
}