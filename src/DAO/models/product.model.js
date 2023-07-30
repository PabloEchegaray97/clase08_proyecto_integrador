import mongoose from 'mongoose'

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    photo: String,
    id: Number
})

const productModel = mongoose.model(productCollection, productSchema)

export default productModel;