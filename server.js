require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
const corsOptions = {
  credentials: true,
  origin: 'http://localhost:3000',
}
app.use(express.json({ limit: '10mb' }))
app.use(cors(corsOptions))
app.use(cookieParser())

// Routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/userRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/commentRouter'))
app.use('/api', require('./routes/uploadRouter'))
// app.use('/api', require('./routes/messageRouter'))

const URI = process.env.MONGODB_URL
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) throw err
  console.log('Connected to MongoDB')
})

app.get('/', (req, res) => {
  res.json({ msg: 'Hello' })
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log('Server is running on port', port)
})
