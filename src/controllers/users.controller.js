import { userService } from "../services/index.js"
import { generateToken } from "../utils.js"

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

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userService.userLogin(email, password);

        const access_token = generateToken(user);

        res.cookie('coderCookie', access_token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true
        }).send({
            status: 'success',
            payload: user
        });
    } catch (error) {
        // Si hay un error en la autenticación, envía un mensaje de error adecuado
        res.status(401).send({
            status: 'error',
            error: 'Invalid email or password'
        });
    }
};