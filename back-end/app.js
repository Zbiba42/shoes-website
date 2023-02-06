const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/ShoesWebsite', async () => {
  console.log('conected')
})

const Shoes = require('./routes/shoes')
const Authentication = require('./routes/Authentication')
const User = require('./routes/user')

app.use('/api/Shoes', Shoes)

app.use('/api/Authentication', Authentication)

app.use('/api/user', User)


app.listen(5000, () => {
  console.log('server is listening')
})
