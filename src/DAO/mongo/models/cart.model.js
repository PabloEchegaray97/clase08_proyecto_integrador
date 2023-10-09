import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
            quantity: Number
        }
    ]
});

cartSchema.pre('find', function(next) {
    this.populate('products.product');
    next();
});

cartSchema.pre('findOne', function(next) {
    this.populate('products.product');
    next();
})

const cartModel = mongoose.model('carts', cartSchema)
export default cartModel