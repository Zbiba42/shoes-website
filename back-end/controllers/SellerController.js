const Store = require('../models/store')

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

    const StoreId = req.body.id
    const item = req.body.item
    const Storee = await Store.updateOne(
      { id: StoreId },
      { $push: { products: item } }
    )
    res.status(200).json({ succes: true, data: Storee })
  } catch (error) {
    res.status(400).json({ succes: false, data: error.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const StoreId = req.body.id
    const itemId = req.body.itemId
    const updatedItem = req.body.updatedItem
    const { products } = await Store.findOne({ id: StoreId })
    const item = products.find((item) => item.id === itemId)
    products[products.indexOf(item)] = updatedItem
    await Store.updateOne({ id: StoreId }, { products: products })
    res.status(200).json({ succes: true, data: products })
  } catch (error) {
    res.status(400).json({ succes: false, data: error.message })
  }
}
module.exports = {
  addProduct,
  updateProduct
}
