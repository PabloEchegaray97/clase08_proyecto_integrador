import config from '../config/config.js'
import mongoose from 'mongoose'

export let Product
export let User
export let Cart
export let Chat

console.log(`Persistence with ${config.persistence}`);

switch(config.persistence) {
    case 'MONGO':
        mongoose.connect(config.dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: config.dbName
        })
        mongoose.set('strictQuery', false);
        const {default: ProductMongo} = await import('./mongo/products.mongo.js')
        const {default: UserMongo} = await import('./mongo/users.mongo.js')
        const {default: CartMongo} = await import('./mongo/carts.mongo.js')
        const {default: ChatMongo} = await import('./mongo/chats.mongo.js')


        Product = ProductMongo
        User = UserMongo
        Cart = CartMongo
        Chat = ChatMongo

        break;
    default:
        break;
}