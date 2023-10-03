import UserModel from "./models/user.model.js";
import { isValidPassword } from "../../utils.js";

export default class Product {
    getUsers = async () => {
        const result = await UserModel.find()
        return result;
    }
    getUser = async (email) => {
        return await UserModel.findOne({ email }).lean().exec()
    }
    getUserById = async (id) => {
        return await UserModel.findOne({_id: id})
    }
    createUser = async (user) => {
        return await UserModel.create(user)
    }
    userLogin = async (email, password) => {
        const user = await this.getUser(email)
        console.log(user)
        if (!user) {
            throw new Error('Invalid email!')
        }
        const result = isValidPassword(user, password)
        console.log(result);
        if (!result) {
            throw new Error('Invalid password!')
        }
        return user;
    }
    userRegister = async (newUser) => {
        const user = await getUser(newUser.email)
        if (user) {
            throw new Error ('User already exists')
        }
        return await this.createUser(newUser)
    }
    
}