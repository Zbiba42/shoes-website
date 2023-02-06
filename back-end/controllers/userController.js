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

const UploadStoreImg = async (req, res) => {
  await Store.updateOne(await Store.findOne().sort({ _id: -1 }), {
    image: `./uploads/${req.file.filename}`,
  })
  const Storeee = await Store.findOne().sort({ _id: -1 })
  const { _id, Fullname, Cart, Email } = await User.findOne({
    Email: req.body.Email,
  })

  const user = {
    id: _id,
    Fullname: Fullname,
    Store: Storeee,
    Cart: Cart,
    Email: Email,
  }

  const accestoken = jwt.sign(user, process.env.ACCES_TOKEN_SECRET, {
    expiresIn: '30m',
  })

  res.status(200).json({ succes: true, data: { accesToken: accestoken } })
}

module.exports = {
  CreateStore,
  addToCart,
  UploadStoreImg,
}
