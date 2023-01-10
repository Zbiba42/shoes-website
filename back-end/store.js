const mongoose = require('mongoose')

const StoreSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  ownerId:{
    type : String,
    required : true
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    min: [20, 'Description must be at least 20 characters'],
  },
  products: {
    type: Array,
  },
})

module.exports = mongoose.model('Store', StoreSchema)
