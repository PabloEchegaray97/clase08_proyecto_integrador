import UserDTO from '../DAO/DTO/user.dto.js'

export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }
    getUsers = async () => {
        return await this.dao.getUsers()
    }
    getUser = async (email) => {
        return await this.dao.getUser(email)
    }
    createUser = async(user) => {
        const newUser = new UserDTO(user)
        return await this.dao.createUser(newUser)
    }
}