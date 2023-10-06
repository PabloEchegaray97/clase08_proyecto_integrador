import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    photo: String,
    id: Number,
    quantity: Number
})

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema)

export default productModel;