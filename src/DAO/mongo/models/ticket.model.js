import mongoose from "mongoose";
const TicketModel = mongoose.model('tickets', new mongoose.Schema({
    code: String,
    purchase_datetime: Date,
    amount: Number,
    purchaser: String
}))

export default TicketModel