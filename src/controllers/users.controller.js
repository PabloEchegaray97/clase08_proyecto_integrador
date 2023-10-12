import { userService, cartService } from "../services/index.js"
import { generateToken } from "../utils.js"
import EErrors from "../services/errors/enums.js"
import CustomError from "../services/errors/custom_error.js";
import { generateUserErrorInfo } from "../services/errors/info.js"

export const getUsers = async (req, res) => {
    const result = await userService.getUsers()
    res.send({ status: 'success', payload: result })
}

export const getUser = async (req, res) => {
    const user = req.body
    const result = await userService.getUser(user)
    res.send({ status: 'success', payload: result })
}
export const getUserById = async (req, res) => {
    const { id } = req.params
    const result = await userService.getUserById(id)
    res.send({ status: 'success', payload: result })
}
export const createUser = async (req, res) => {
    const user = req.body
    if(!user.last_name || !user.first_name || !user.email) {

        CustomError.createError({
            name: 'User creation error',
            cause: generateUserErrorInfo(user),
            message: 'Error trying to create user',
            code: EErrors.INVALID_TYPES_ERROR
        });
        
        
    }
    const newCart = await cartService.createCart()
    user.cart = newCart._id
    console.log(user);
    const result = await userService.createUser(user)
    res.send({ status: 'success', payload: result })
}

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const {password:_, ...userWitoutSensitiveData} = await userService.userLogin(email, password);
        console.log(userWitoutSensitiveData); 
        const access_token = generateToken(userWitoutSensitiveData);

        res.cookie('coderCookie', access_token, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true
        }).send({
            status: 'success',
            payload: userWitoutSensitiveData
        });
    } catch (error) {
        res.status(401).send({
            status: 'error',
            error: 'Invalid email or password'
        });
    }
};

export const userRegister = async (req, res) => {
    res.redirect('/')
}

export const getAdminPanel = async (req, res) => {
    try {
        const users = await userService.getUsers();
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user._doc;
            return userWithoutPassword;
        });
        res.send({
            status: 'success',
            payload: usersWithoutPasswords
        });
    } catch (error) {
        res.status(500).send({
            status: 'error',
            error: 'Internal server error'
        });
    }
};