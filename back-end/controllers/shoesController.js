const { readFileSync } = require('fs')

let Shoes = JSON.parse(readFileSync('./shoes1.json', 'utf-8'))

const getAllShoes = async (req, res) => {
  res.status(200).json({ succes: true, data: Shoes, error: '' })
}

const getCategoriesNames = (req, res) => {
  let results = []
  Shoes.map((shoe) => {
    if (results.includes(shoe.category) == false) {
      results.push(shoe.category)
    }
  })
  if (results.length >= 1) {
    res.status(200).json({ succes: true, data: results, error: '' })
  } else {
    res
      .status(200)
      .json({ succes: false, data: results, error: 'category not found' })
  }
}

const getShoesInCategory = (req, res) => {
  let category = req.params.category
  let results = []
  Shoes.map((shoe) => {
    if (shoe.category == category) {
      results.push(shoe)
    }
  })
  if (results.length >= 1) {
    res.status(200).json({ succes: true, data: results, error: '' })
  } else {
    res
      .status(200)
      .json({ succes: false, data: results, error: 'category not found' })
  }
}

const getPopularShoes = (req, res) => {
  let results = []
  for (let i = 0; i < 5; i++) {
    let num = Math.floor(Math.random() * 33)
    const shoe = Shoes[num]
    results.push(shoe)
  }
  if (results.length >= 1) {
    res.status(200).json({ succes: true, data: results, error: '' })
  } else {
    res.status(200).json({
      succes: false,
      data: results,
      error: 'no popular shoes are available right now',
    })
  }
}

const getShoeInfo = (req, res) => {
  let name = req.params.name
  let results
  Shoes.map((shoe) => {
    if (
      shoe.name.toLocaleLowerCase().trim() == name.toLocaleLowerCase().trim()
    ) {
      results = shoe
    }
  })
  if (results) {
    res.status(200).json({ succes: true, data: results, error: '' })
  } else {
    res.status(200).json({
      succes: false,
      data: results,
      error: 'no shoes found with that name',
    })
  }
}

const getShoesInBrand = (req, res) => {
  let brand = req.params.brand
  let results = []
  Shoes.map((shoe) => {
    if (
      shoe.brand
        .toLocaleLowerCase()
        .trim()
        .includes(brand.toLocaleLowerCase().trim())
    ) {
      results.push(shoe)
    }
  })
  if (results.length >= 1) {
    res.status(200).json({ succes: true, data: results, error: '' })
  } else {
    res.status(200).json({
      succes: false,
      data: results,
      error: 'no shoes found with that name',
    })
  }
}

const getShoesForGender = (req, res) => {
  let gender = req.params.gender
  let results = []
  Shoes.map((shoe) => {
    if (
      shoe.gender
        .toLocaleLowerCase()
        .trim()
        .includes(gender.toLocaleLowerCase().trim())
    ) {
      results.push(shoe)
    }
  })
  if (results.length >= 1) {
    res.status(200).json({ succes: true, data: results, error: '' })
  } else {
    res.status(200).json({
      succes: false,
      data: results,
      error: `no shoes found for ${gender.toLocaleLowerCase()}`,
    })
  }
}

module.exports = {
  getAllShoes ,
  getCategoriesNames , 
  getShoesInCategory ,
  getPopularShoes ,
  getShoeInfo ,
  getShoesInBrand ,
  getShoesForGender
}