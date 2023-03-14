const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  StoreId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  is_in_inventory: {
    type: Boolean,
    required: true,
  },
  items_left: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Product', productSchema)
