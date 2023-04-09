const Product = require('../models/product')

const getProducts = async (req, res) => {
  try {
    const StoreId = req.query.StoreId
    const products = await Product.find({ StoreId: StoreId })
    res.status(200).json({ succes: true, data: products })
  } catch (error) {
    res.status(400).json({ succes: true, error: error })
  }
}

const addProduct = async (req, res) => {
  try {
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
const UploadProductImg = async (req, res) => {
  try {
    const id = req.body.id
    if (id) {
      const product = await Product.updateOne(
        await Product.findOne({ _id: id }),
        {
          imageURL: `./uploads/${req.file.filename}`,
        }
      )
      res.status(200).json({ succes: true, data: product })
    } else {
      const product = await Product.updateOne(
        await Product.findOne().sort({ _id: -1 }),
        {
          imageURL: `./uploads/${req.file.filename}`,
        }
      )
      res.status(200).json({ succes: true, data: product })
    }
  } catch (error) {
    res.status(400).json({ succes: true, data: error })
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
const removeProduct = async (req, res) => {
  try {
    const { _id } = req.body.product
    const product = await Product.findOneAndRemove({ _id: _id })
    res.status(200).json({ succes: true, data: product })
  } catch (error) {
    res.status(401).json({ succes: false, error: error })
  }
}
module.exports = {
  addProduct,
  updateProduct,
  getProducts,
  UploadProductImg,
  removeProduct,
}
