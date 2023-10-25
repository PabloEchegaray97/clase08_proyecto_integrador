import UserDTO from '../DAO/DTO/user.dto.js'
import Mail from '../services/mail/mail.js'

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
    createUser = async(user) => {
        const newUser = new UserDTO(user)
        return await this.dao.createUser(newUser)
    }
    userLogin = async(email, password) => {
        return await this.dao.userLogin(email,password)
    }
    getAdminPanel = async() => {
        return await this.dao.getAdminPanel()
    }
    getUserByCartId = async(cid) => {
        return await this.dao.getUserByCartId(cid)
    }
    sendMail = async (user, subject) => {
        const html = `<h1> test </h1>`
        const result = await this.mail.send(user, subject, html)
        return result
    }
}