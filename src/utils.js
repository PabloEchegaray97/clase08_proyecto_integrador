import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { faker } from '@faker-js/faker/locale/es'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PRIVATE_KEY = 'coderTokenForJWT'

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password) // true o false
}

// JWT Generamos el token
export const generateToken = (user) => {
    const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '1h' })

    return token
}

// En utils.js
export const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, PRIVATE_KEY);
        return decoded;
    } catch (error) {
        console.error('Error al verificar el token:', error);
        throw new Error('Token inválido');
    }
};



// JWT Extraemos el token del header
export const authToken = (req, res, next) => {

    // Buscamos el token en el header o en la cookie
    let authHeader = req.headers.auth
    if (!authHeader) {
        authHeader = req.cookies['coderToken']
        if (!authHeader) {
            return res.status(401).send({
                error: 'Not auth'
            })
        }
    }

    // Verificamos y desencriptamos la informacion 
    const token = authHeader
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: 'Not authroized' })

        req.user = credentials.user
        next()
    })
}

export const passportCall = strategy => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err)
            if (!user) {
                return res.status(401).send({
                    error: info.messages ? info.messages : info.toString()
                })
            }

            req.user = user
            next()
        })(req, res, next)
    }
}

export const authorization = role => {

    return async (req, res, next) => {
        const user = req.user

        if (!user) return res.status(401).send({ error: 'Unauthorized' })
        if (user.user.role != role) return res.status(403).send({ error: 'No permission' })

        return next()
    }

}

export const auth = (req, res, next) => {
    console.log(req.session.user)
    if (req.session?.user.role == 'admin') return next()
    return res.status(401).send('Unauthorized')
}

/*
function auth(req, res, next) {
    if(req.session?.user.role == 'admin') return next()
    return res.status(401).send('No tienes acceso a esta pagina')
}


*/

export const generateProduct = () => {
    return {
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        quantity: faker.number.int({ max: 100 }),
        id: faker.database.mongodbObjectId(),
        photo: faker.image.urlLoremFlickr()
    }
}

export default __dirname