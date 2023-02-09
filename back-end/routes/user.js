const express = require('express')
const router = express.Router()

const multer = require('multer')
const { authToken } = require('../controllers/AuthenticationController')
const {
  CreateStore,
  addToCart,
  removeFromCart,
  addToFav,
  removeFromFav,
  UploadStoreImg,
  UpdateInfos,
} = require('../controllers/userController')

router.post('/createStore', authToken, CreateStore)

router.post('/addToCart', authToken, addToCart)

router.post('/removeFromCart', authToken, removeFromCart)

router.post('/addToFav', authToken, addToFav)

router.post('/removeFromFav', authToken, removeFromFav)

router.post('/updateInfos', authToken, UpdateInfos)

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storageEngine })

router.post('/upload', upload.single('image'), UploadStoreImg)

module.exports = router
