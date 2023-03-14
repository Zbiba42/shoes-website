const Store = require('../models/store')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

let refreshTokens = []

const SignUp = async (req, res) => {
  try {
    const HashedPass = await bcrypt.hash(req.body.Password, 10)
    const user = {
      Fullname: req.body.Fullname,
      Email: req.body.Email,
      Password: HashedPass,
      Cart: [],
      Loved: [],
    }
    await User.create(user)
    res.status(200).json({ succes: true, data: user })
  } catch (error) {
    res.status(400).json({ succes: false, error: error.message })
  }
}

const LogIn = async (req, res) => {
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
      const { _id, Fullname, Cart, Email, Loved } = await User.findOne({
        Email: req.body.Email,
      })
      const store = await Store.findOne({ ownerId: _id })
      const user = {
        id: _id,
        Fullname: Fullname,
        Store: store,
        Cart: Cart,
        Loved: Loved,
        Email: Email,
      }

      const accesToken = jwt.sign(user, process.env.ACCES_TOKEN_SECRET, {
        expiresIn: '15m',
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
}

const LogOut = (req, res) => {
  const refreshToken = req.body.token
  refreshTokens = refreshTokens.filter((token) => {
    if (token != refreshToken) {
      return token
    }
  })
  res.status(200).json({ succes: false, data: 'you logged out succesfully!  ' })
}

const RefreshToken = (req, res) => {
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
    err &&
      res.status(400).json({
        succes: false,
        data: err,
      })

    refreshTokens = refreshTokens.filter((token) => {
      if (token != refreshToken) {
        return token
      }
    })

    const newAccesToken = jwt.sign(
      {
        id: user.id,
        Fullname: user.Fullname,
        Store: user.Store,
        Cart: user.Cart,
        Loved: Loved,
        Email: user.Email,
      },
      process.env.ACCES_TOKEN_SECRET,
      {
        expiresIn: '15m',
      }
    )
    const newRefreshToken = jwt.sign(
      {
        id: user.id,
        Fullname: user.Fullname,
        Store: user.Store,
        Cart: user.Cart,
        Loved: Loved,
        Email: user.Email,
      },
      process.env.REFRESH_TOKEN_SECRET
    )

    refreshTokens.push(newRefreshToken)

    res.status(200).json({
      succes: true,
      data: {
        accessToken: newAccesToken,
        refreshToken: newRefreshToken,
      },
    })
  })
}

const authToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null)
    return res.status(400).json({ succes: false, error: 'token is null' })

  jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ succes: false, error: err })

    req.payload = payload
    next()
  })
}

module.exports = {
  SignUp,
  LogIn,
  LogOut,
  RefreshToken,
  authToken,
}
