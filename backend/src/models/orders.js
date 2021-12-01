const mongoose = require('mongoose')

const modelSchema = {
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    components:[{
        name: {
            type: String,
            required: true
        },
        model:{
            type: String,
            required: true
        }
    }]
}

const orderSchema = new mongoose.Schema(modelSchema)

const Order = mongoose.model('Order', orderSchema)

module.exports = Order