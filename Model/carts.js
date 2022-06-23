const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [
        {   productName: { type: String, required: true },
            productId: { type: String, required: true },
            productQuantity: { type: Number, default: 1 },
            productPrice: {type: Number, required: true}
        }
    ],
    amount: {type: Number, required: true}
},
    { timestamps: true }
)

module.exports = mongoose.model("Carts", cartSchema)