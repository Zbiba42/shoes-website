const express = require('express')
const router = express.Router()

const {
  SignUp,
  LogIn,
  LogOut,
  RefreshToken,
  authToken,
} = require('../controllers/AuthenticationController')

// men b3d andirha db

router.post('/SignUp', SignUp)

router.post('/LogIn', LogIn)

router.post('/logout', authToken, LogOut)

router.post('/refresh', RefreshToken)

router.get('/testings', authToken, (req, res) => {
  res.status(200).json({ succes: true, data: 'U HAVE ACCES UWU' })
})

module.exports = router