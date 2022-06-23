const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
        productName: { type: String, required: true},
        productDesc: { type: String, required: true },
        productPrice: { type: Number, required: true }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Products", ProductSchema)