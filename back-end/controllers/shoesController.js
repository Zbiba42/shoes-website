const Product = require('../models/product')

const getAllShoes = async (req, res) => {
  const Shoes = await Product.find()
  res.status(200).json({ succes: true, data: Shoes, error: '' })
}

const getCategoriesNames = async (req, res) => {
  try {
    let categories = await Product.distinct('category')
    if (categories.length >= 1) {
      res.status(200).json({ succes: true, data: categories, error: '' })
    } else {
      res
        .status(200)
        .json({ succes: false, data: [], error: 'category not found' })
    }
  } catch (error) {
    res.status(200).json({ succes: false, data: [], error: error })
  }
}

const getShoesInCategory = async (req, res) => {
  let category = req.params.category.toUpperCase()
  const Shoes = await Product.find({ category: category })
  const startIndex = parseInt(req.query.startIndex)
  const endIndex = parseInt(req.query.endIndex)
  const gender = req.query.gender.toLowerCase()
  let results = []
  let count = 0
  Shoes.map((shoe) => {
    if (shoe.gender.toLowerCase() == gender || gender == 'all') {
      count++
      if (count > startIndex && count <= endIndex) {
        results.push(shoe)
      }
    }
  })
  if (results.length >= 1) {
    res.status(200).json({ succes: true, data: results, length: count })
  } else {
    res
      .status(200)
      .json({ succes: false, data: results, error: 'category not found' })
  }
}

const getPopularShoes = async (req, res) => {
  const Shoes = await Product.aggregate([{ $sample: { size: 5 } }])
  if (Shoes.length >= 1) {
    res.status(200).json({ succes: true, data: Shoes, error: '' })
  } else {
    res.status(200).json({
      succes: false,
      data: [],
      error: 'no popular shoes are available right now',
    })
  }
}

const getShoeInfo = async (req, res) => {
  let name = req.params.name.trim()
  const Shoe = await Product.findOne({ name: name })
  if (Shoe) {
    res.status(200).json({ succes: true, data: Shoe, error: '' })
  } else {
    res.status(200).json({
      succes: false,
      data: [],
      error: 'no shoes found with that name',
    })
  }
}

module.exports = {
  getAllShoes,
  getCategoriesNames,
  getShoesInCategory,
  getPopularShoes,
  getShoeInfo,
}
