const mongoose = require('mongoose')
const MenuItemSchema = mongoose.Schema({
    name : {
        type : String,
        required: true
    },
    price : {
        type : Number,
        require : true
    },
    taste : {
        type : String,
        enum : ["sweet","sour","spicy"]
    },
    is_drink : {
        type : Boolean,
        default : false
    },
    ingredients : {
        type : [String],
        default : []
    },
    num_sales : {
        type : Number,
        default : 0
    }
})

module.exports = mongoose.model('MenuItem', MenuItemSchema)