const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    }
})

module.exports = mongoose.model('product', productSchema)