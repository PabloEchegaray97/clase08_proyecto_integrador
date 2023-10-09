import { Router } from "express";
import { generateToken, passportCall, authorization, isValidPassword } from "../utils.js";
import UserModel from "../DAO/mongo/models/user.model.js";
const usersDB = []
const router = Router()

router.post('/register', (req, res) => {
    const user = req.body
    if (usersDB.find(u => u.email === user.email)) {
        return res.status(400).send('User already exits')
    }

    usersDB.push(user)
    const access_token = generateToken(user)

    res.cookie('coderCookie', access_token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
    }).send({ message: 'Logged In!' })
})

router.post('/login', async  (req, res) => {
    const { email, password } = req.body

    const user = await UserModel.findOne({ email}).lean().exec()
    console.log(user);
    if (!user) return res.status(401).send({ status: "error", error: 'Invalid pass' })
    
    const result = isValidPassword(user, password)
    if(!result) {
        return res.status(404).send('Invalid credentials')
    }
    const access_token = generateToken(user)

    res.cookie('coderCookie', access_token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
    }).redirect('/profile')
})

router.get('/everyone', passportCall('jwt'), (req, res) => {
    console.log('Path /everyone')
    res.send({ status: 'success', payload: req.user })
})

router.get('/admin', passportCall('jwt'), authorization('admin'), async (req, res) => {
    const user = req.user.user
    console.log(user);
    const users = await UserModel.find().lean().exec()
    console.log(users);
    res.render('admin', { users, user }) // Pasamos un objeto con la propiedad "users"
})

export default router