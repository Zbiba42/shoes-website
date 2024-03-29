const mongoose = require('mongoose')

const StoreSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    min: [20, 'Description must be at least 20 characters'],
  },
})

module.exports = mongoose.model('Store', StoreSchema)
