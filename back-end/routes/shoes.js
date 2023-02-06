const express = require('express')
const router = express.Router()

const {
  getAllShoes,
  getCategoriesNames,
  getShoesInCategory,
  getPopularShoes,
  getShoeInfo,
  getShoesInBrand,
  getShoesForGender,
} = require('../controllers/shoesController')

router.get('/AllShoes', getAllShoes)

router.get('/popular', getPopularShoes)

router.get('/categories', getCategoriesNames)

router.get('/categories/:category', getShoesInCategory)

router.get('/shoe/:name', getShoeInfo)

router.get('/brand/:brand', getShoesInBrand)

router.get('/gender/:gender', getShoesForGender)

module.exports = router
