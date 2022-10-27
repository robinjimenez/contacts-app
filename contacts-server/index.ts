import * as dotenv from 'dotenv'
import mongoose, { Types } from 'mongoose'
import express from 'express'
import cors from 'cors'

import router from './src/routes'
import { contactService, userService } from './src/services'
import { Contact, User as UserType } from './src/types'

dotenv.config()

const port = process.env.PORT || 3001
const app = express()

const corsSettings = {
  origin: ['http://localhost:3000', 'http://localhost:3000/', 'localhost:3000'],
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
}

app.use(cors(corsSettings))
app.options('*', cors(corsSettings))

app.use(express.json())
app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

(async () => {
  try {
    if (!process.env.MONGODB_URL) throw Error('Missing DB data')
    if (!process.env.DEFAULT_USER_ID) throw Error('Missing default user data')

    await mongoose.connect(process.env.MONGODB_URL)
    
  } catch (err) {
    console.log('Unable to connect to database: ', err)
  }
})()
