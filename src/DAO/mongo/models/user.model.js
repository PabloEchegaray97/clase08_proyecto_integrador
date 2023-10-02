import mongoose from "mongoose";

const UserModel = mongoose.model('users', new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    first_name: String,
    last_name: String,
    age: Number,
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    cart: String //usar id del carrito nuevo
}));

export default UserModel;
