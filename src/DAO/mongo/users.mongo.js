import UserModel from "./models/user.model.js";

export default class Product {
    getUsers = async () => {
        const result = await UserModel.find()
        return result;
    }
    getUser = async (email) => {
        return await UserModel.findOne({ email }).lean().exec()
    }
    createUser = async (user) => {
        return await UserModel.create(user)
    }
}