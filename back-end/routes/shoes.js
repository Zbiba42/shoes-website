const express = require('express')
const router = express.Router()

const {
  getAllShoes,
  getCategoriesNames,
  getShoesInCategory,
  getPopularShoes,
  getShoeInfo,
  Search,
  getShoeById,
} = require('../controllers/shoesController')

router.get('/AllShoes', getAllShoes)

router.get('/popular', getPopularShoes)

router.get('/categories', getCategoriesNames)

router.get('/categories/:category', getShoesInCategory)

router.get('/shoe/search', Search)

router.get('/shoe/:name', getShoeInfo)

router.get('/ShoeUp/:Id', getShoeById)

module.exports = router
