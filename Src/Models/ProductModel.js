const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please enter the product name"],
    },
    quantity: {
        type: String,
        require: true,
        default: 0,
    },
    price: {
        type: Number,
        require: true,
    },
    image: {
        type: String,
        require: false,
    },

},
    {
        timestamps: true,
    })

const proudct = mongoose.model('Product', productSchema);


module.exports = proudct;