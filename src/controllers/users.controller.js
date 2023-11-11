import { userService, cartService } from "../services/index.js"
import { generateToken, createHash } from "../utils.js"
import CustomError from "../services/errors/custom_error.js";
import { generateUserErrorInfo, generateUserLoginErrorInfo } from "../services/errors/info.js"
import EErrors from "../services/errors/enums.js"


export const getUsers = async (req, res) => {
    try {
        const result = await userService.getUsers()
        res.send({ status: 'success', payload: result })
    } catch (error) {
        res.status(400).send({ status: 'Error', error: 'Cannot get users' })

    }

}

export const getUser = async (req, res, next) => {
    try {
        const user = req.body
        const result = await userService.getUser(user)
        if (!user.email) {
            req.logger.error(`Error trying to get user, email doesn't exist`)
            CustomError.createError({
                name: 'User logging error',
                cause: generateUserLoginErrorInfo(user.email),
                message: 'Error trying to get user',
                code: EErrors.INVALID_TYPES_ERROR
            });
        }
        return res.send({ status: 'success', payload: result })
    } catch (error) {
        next(error)
    }

}
export const getUserById = async (req, res) => {
    const { id } = req.params
    const result = await userService.getUserById(id)
    res.send({ status: 'success', payload: result })
}
export const createUser = async (req, res, next) => {
    try {
        const user = req.body
        if (!user.email) {
            req.logger.error(`Error trying to get user, email doesn't exist`)
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
        return res.send({ status: 'success', payload: result })
    } catch (error) {
        next(error)
    }

}

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { password: _, ...userWitoutSensitiveData } = await userService.userLogin(email, password);
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

export const sendMail = async (req, res) => {
    const email = req.body
    console.log(email);
    const user = await userService.getUser(email)
    console.log(user);
    const subject = 'test'
    const result = await userService.sendMail(user,subject )
    res.send({status: 'success', payload: result})
}

export const resetPassword = async (req, res) => {
    const {token} = req.query
    const newPassword = req.body.newPassword || ''
    console.log(token);
    console.log(newPassword);
    try {
        const result = await userService.resetPassword(token);
        if (result && newPassword != '') {
            const uid = result.user._id
            console.log("Usuario encontrado");
            console.log(uid);
            const modifiedUser = await userService.modifyUser(uid, {password: newPassword})
            return res.send({ status: 'success', payload: modifiedUser});
        } 

        return res.send({status: 'failed', payload: 'Por favor ingrese su nueva contraseña:'})

    } catch (error) {
        res.status(400).send({ status: 'error', error: error.message });
    }
}
export const testToken = async (req, res) => {
    const userToken = req.body
    const user = await userService.getUser(userToken)
    const result = await userService.testToken(user)
    res.send({status:'success', payload: result})
}

export const testUser = async (req, res) => {
    const newuser = req.body
    const user = await userService.getUser(newuser)
    console.log(newuser);
    const modifiedUser = await userService.modifyUser(user._id, {password: newuser.password})
    res.send({status:'success', payload: modifiedUser})

}