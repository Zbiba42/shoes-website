const Store = require('../models/store')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const CreateStore = async (req, res) => {
  try {
    const store = {
      storeName: req.body.storeName,
      ownerId: req.body.ownerId,
      image: req.body.image,
      description: req.body.description,
      products: [],
    }
    const Storee = await Store.create(store)

    res.status(200).json({ succes: true, data: Storee })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

const getCart = async (req, res) => {
  try {
    const id = req.query.id
    const { Cart } = await User.findOne({ id: id })
    res.status(200).json({ succes: true, data: Cart })
  } catch (error) {
    res.status(400).json({ succes: true, error: error })
  }
}

const addToCart = async (req, res) => {
  try {
    const id = req.body.id
    const item = req.body.item
    const Cart = await User.updateOne({ _id: id }, { $push: { Cart: item } })
    res.status(200).json({ succes: true, data: Cart })
  } catch (error) {
    res.status(400).json({ succes: false, data: error.message })
  }
}

const removeFromCart = async (req, res) => {
  try {
    const UserId = req.body.userId
    const Item = req.body.item
    const { Cart } = await User.findOne({ id: UserId })
    const item = Cart.find((item) => item.name === Item.name)
    Cart.splice(Cart.indexOf(item), 1)
    const response = await User.updateOne({ id: UserId }, { Cart: Cart })
    res.status(200).json({ succes: true, data: Cart })
  } catch (error) {
    res.status(400).json({ succes: false, error: error })
  }
}

const getFavorites = async (req, res) => {
  try {
    const id = req.query.id
    const { Loved } = await User.findOne({ id: id })
    res.status(200).json({ succes: true, data: Loved })
  } catch (error) {
    res.status(400).json({ succes: true, error: error })
  }
}

const addToFav = async (req, res) => {
  try {
    const id = req.body.id
    const item = req.body.item
    const Loved = await User.updateOne({ _id: id }, { $push: { Loved: item } })
    res.status(200).json({ succes: true, data: Loved })
  } catch (error) {
    res.status(400).json({ succes: false, data: error.message })
  }
}

const removeFromFav = async (req, res) => {
  try {
    const UserId = req.body.userId
    const Item = req.body.item
    const { Loved } = await User.findOne({ id: UserId })
    const item = Loved.find((item) => item.name === Item.name)
    Loved.splice(Loved.indexOf(item), 1)
    const response = await User.updateOne({ id: UserId }, { Loved: Loved })
    res.status(200).json({ succes: true, data: Loved })
  } catch (error) {
    res.status(400).json({ succes: false, error: error })
  }
}

const UploadStoreImg = async (req, res) => {
  await Store.updateOne(await Store.findOne().sort({ _id: -1 }), {
    image: `./uploads/${req.file.filename}`,
  })
  const Storeee = await Store.findOne().sort({ _id: -1 })
  const { _id, Fullname, Cart, Email, Loved } = await User.findOne({
    Email: req.body.Email,
  })

  const user = {
    id: _id,
    Fullname: Fullname,
    Store: Storeee,
    Cart: Cart,
    Loved: Loved,
    Email: Email,
  }

  const accestoken = jwt.sign(user, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: '30m',
  })

  res.status(200).json({ succes: true, data: { accesToken: accestoken } })
}

const UpdateInfos = async (req, res) => {
  try {
    const user = {
      id: req.body.id,
      Fullname: req.body.Fullname,
      Email: req.body.Email,
    }
    const response = await User.updateOne({ id: id }, { user })

    res.status(200).json({ succes: true, data: response })
  } catch (error) {
    res.status(400).json({ succes: false, error: error })
  }
}

module.exports = {
  CreateStore,
  getCart,
  addToCart,
  removeFromCart,
  getFavorites,
  addToFav,
  removeFromFav,
  UploadStoreImg,
  UpdateInfos,
}
