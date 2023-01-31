const express = require('express')
const app = express()

const { readFileSync } = require('fs')

const cors = require('cors')
app.use(cors())
app.use(express.json())

let Shoes = JSON.parse(readFileSync('./shoes1.json', 'utf-8'))
let menShoes = []
Shoes.map((shoe) => {
  if (shoe.gender.toLocaleLowerCase().trim().includes('Men')) {
    menShoes.push(shoe)
  }
})
app.get('/AllShoes', async (req, res) => {
  res.status(200).json({ succes: true, data: Shoes, error: '' })
})

app.get('/categories', (req, res) => {
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
})

app.get('/category/:category', (req, res) => {
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
})

app.get('/popular', (req, res) => {
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
})

app.get('/shoes/:name', (req, res) => {
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
})

app.get('/brand/:brand', (req, res) => {
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
})

app.get('/gender/:gender', (req, res) => {
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
})

////////////////////////////////////////////////////////////////////////

const mongoose = require('mongoose')
const Store = require('./store')
const User = require('./user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
mongoose.connect('mongodb://127.0.0.1:27017/ShoesWebsite', async () => {
  console.log('conected')
})
// men b3d andirha db
let refreshTokens = []

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.token
  if (!refreshToken)
    return res
      .status(401)
      .json({ succes: false, error: 'you are not authenticated !' })
  if (!refreshTokens.includes(refreshToken)) {
    return res
      .status(403)
      .json({ succes: false, error: 'refreshToken is invalid !' })
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    err && console.log(err)
    refreshTokens = refreshTokens.filter((token) => {
      if (token != refreshToken) {
        return token
      }
    })

    const newAccesToken = jwt.sign(user, process.env.ACCES_TOKEN_SECRET, {
      expiresIn: '30m',
    })
    const newRefreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)

    refreshTokens.push(newRefreshToken)

    res.status(200).json({
      succes: true,
      data: {
        accessToken: newAccesToken,
        refreshToken: newRefreshToken,
      },
    })
  })
})

app.get('/testings', authToken, (req, res) => {
  res.status(200).json({ succes: true, data: 'U HAVE ACCES UWU' })
})

app.post('/logout', authToken, (req, res) => {
  const refreshToken = req.body.token
  refreshTokens = refreshTokens.filter((token) => {
    if (token != refreshToken) {
      return token
    }
  })
  res.status(200).json({ succes: false, data: 'you logged out succesfully!  ' })
})

app.post('/SignUp', async (req, res) => {
  try {
    const HashedPass = await bcrypt.hash(req.body.Password, 10)
    const user = {
      Fullname: req.body.Fullname,
      Email: req.body.Email,
      Password: HashedPass,
      Cart: [],
    }
    await User.create(user)
    res.status(200).json({ succes: true, data: user })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
})

app.post('/LogIn', async (req, res) => {
  /// authentification

  try {
    const user = await User.findOne({ Email: req.body.Email })
    if (user == null) {
      res
        .status(400)
        .json({ succes: false, error: 'no user found with that email' })
    }
    if (await bcrypt.compare(req.body.Password, user.Password)) {
      // res.status(200).json({ succes: true, data: 'user logged in' })

      //// authorisation
      const { _id, Fullname, Cart, Email } = await User.findOne({
        Email: req.body.Email,
      })
      const store = await Store.findOne({ ownerId: _id })
      const user = {
        id: _id,
        Fullname: Fullname,
        Store: store,
        Cart: Cart,
        Email: Email,
      }

      const accesToken = jwt.sign(user, process.env.ACCES_TOKEN_SECRET, {
        expiresIn: '30m',
      })
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
      refreshTokens.push(refreshToken)

      res.status(200).json({
        succes: true,
        data: {
          accesToken: accesToken,
          refreshToken: refreshToken,
        },
      })
    } else {
      res.status(400).json({ succes: false, error: 'uncorrect password' })
    }
  } catch (error) {
    res.send(error)
  }
})

app.post('/createStore', authToken, async (req, res) => {
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
})

app.post('/addToCart', authToken, async (req, res) => {
  try {
    const id = req.body.id
    const item = req.body.item
    const Cart = await User.updateOne({ _id: id }, { $push: { Cart: item } })
    res.status(200).json({ succes: true, data: Cart })
  } catch (error) {
    res.status(400).json({ succes: false, data: error.message })
  }
})

function authToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.send('token is null')

  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ succes: false, error: err })

    req.payload = payload
    next()
  })
}

const multer = require('multer')

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../public/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storageEngine })

app.post('/upload', upload.single('image'), async (req, res) => {
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
})

app.listen(5000, () => {
  console.log('server is listening')
})
