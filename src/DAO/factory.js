import config from '../config/config.js'
import mongoose from 'mongoose'

export let Product

console.log(`Persistence with ${config.persistence}`);

switch(config.persistence) {
    case 'MONGO':
        mongoose.connect(config.dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: config.dbName
        })

        const {default: ProductMongo} = await import('./mongo/products.mongo.js')

        Product = ProductMongo
        break;
    default:
        break;
}