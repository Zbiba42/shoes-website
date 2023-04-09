const express = require('express')
const multer = require('multer')
const { authToken } = require('../controllers/AuthenticationController')
const router = express.Router()
const {
  addProduct,
  updateProduct,
  getProducts,
  UploadProductImg,
  removeProduct,
} = require('../controllers/SellerController')

router.get('/getProducts', authToken, getProducts)

router.post('/addProduct', authToken, addProduct)

router.post('/updateProduct', authToken, updateProduct)

router.post('/removeProduct', authToken, removeProduct)

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storageEngine })

router.post('/uploadProduct', upload.single('image'), UploadProductImg)
module.exports = router
