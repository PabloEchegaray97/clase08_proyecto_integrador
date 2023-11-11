import UserDTO from '../DAO/DTO/user.dto.js'
import Mail from '../services/mail/mail.js'
import { generateToken, verifyToken } from '../utils.js'
export default class UserRepository {
    constructor(dao) {
        this.dao = dao
        this.mail = new Mail()
    }
    getUsers = async () => {
        return await this.dao.getUsers()
    }
    getUser = async (user) => {
        return await this.dao.getUser(user.email)
    }
    getUserById = async (id) => {
        return await this.dao.getUserById(id)
    }
    createUser = async (user) => {
        const newUser = new UserDTO(user)
        return await this.dao.createUser(newUser)
    }
    modifyUser = async (uid, user) => {
        return await this.dao.modifyUser(uid, user)
    }
    userLogin = async (email, password) => {
        return await this.dao.userLogin(email, password)
    }
    getAdminPanel = async () => {
        return await this.dao.getAdminPanel()
    }
    getUserByCartId = async (cid) => {
        return await this.dao.getUserByCartId(cid)
    }
    sendMail = async (user, subject) => {
        const resetToken = generateToken(user)
        console.log(resetToken);
        const resetLink = `http://localhost:8080/userstest/reset-password?token=${resetToken}`
        const html = `Click <a href="${resetLink}">here</a> to reset your password.`;
        const result = await this.mail.send(user, subject, html)
        return result
    }
    resetPassword = async (token) => {
        const decodedToken = verifyToken(token);
        return decodedToken;
    }
    //
    testToken = async (user) => {
        const encoded = generateToken(user)
        const decoded = await verifyToken(encoded)
        const result = { encoded, decoded }
        return result
    }

}