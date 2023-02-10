const express = require('express')
const { authToken } = require('../controllers/AuthenticationController')
const router = express.Router()
const { addProduct ,updateProduct} = require('../controllers/SellerController')

router.post('/addProduct', authToken, addProduct)

router.post('/updateProduct' , authToken , updateProduct)

module.exports = router