import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'

import router from './src/routes'

dotenv.config()

const port = 3001
const app = express()

app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

try {
  mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
} catch (err) {
  console.log('Unable to connect to database')
}
