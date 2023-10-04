import UserDTO from '../DAO/DTO/user.dto.js'
export default class UserRepository {
    constructor(dao) {
        this.dao = dao
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
    
}