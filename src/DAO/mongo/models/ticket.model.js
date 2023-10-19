import mongoose from "mongoose";
const ticketSchema = mongoose.Schema({
    code: String,
    purchase_datetime: Date,
    amount: Number,
    purchaser: String,
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    }]
})

ticketSchema.pre('find', function(next) {
    this.populate('products.product');
    next();
});


const TicketModel = mongoose.model('tickets', ticketSchema)

export default TicketModel