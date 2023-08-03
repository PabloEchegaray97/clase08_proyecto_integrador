import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products'

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    photo: String,
    id: Number
})

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model(productCollection, productSchema)

export default productModel;