const Product = require('../models/product')

const addProduct = async (req, res) => {
  try {
    //Product data
    // id
    // name
    // brand
    // gender
    // category
    // price
    // is_in_inventory
    // items_left
    // imageURL

    // const StoreId = req.body.id
    const item = req.body.item
    // const Storee = await Store.updateOne(
    //   { id: StoreId },
    //   { $push: { products: item } }
    // )
    const product = await Product.create(item)
    res.status(200).json({ succes: true, data: product })
  } catch (error) {
    res.status(400).json({ succes: false, data: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    // const StoreId = req.body.id
    const itemId = req.body.itemId
    const updatedItem = req.body.updatedItem
    // const product = await Store.findOne({ id: StoreId })
    // const item = products.find((item) => item.id === itemId)
    // products[products.indexOf(item)] = updatedItem
    const product = await Product.updateOne({ id: itemId }, updatedItem)
    res.status(200).json({ succes: true, data: product })
  } catch (error) {
    res.status(400).json({ succes: false, data: error.message })
  }
}
module.exports = {
  addProduct,
  updateProduct,
}
