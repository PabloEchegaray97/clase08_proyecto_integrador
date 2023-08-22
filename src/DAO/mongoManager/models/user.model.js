import mongoose from "mongoose";

const UserModel = mongoose.model('users', new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    first_name : String,
    last_name : String,
    age: Number,
    password: String,
    role: String
}))

export default UserModel;