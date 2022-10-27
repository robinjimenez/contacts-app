import * as dotenv from 'dotenv'
import mongoose, { Types } from 'mongoose'
import express from 'express'
import cors from 'cors'
import jwt, { JwtPayload } from 'jsonwebtoken'

import router from './src/routes'
import { userService } from './src/services'

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

// Simple authentication middleware
app.use('/api/contacts*', async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) { res.sendStatus(401); return }

  const token = authorization.split(' ')
  const decodedToken = jwt.verify(token[1], process.env.PRIVATE_KEY || '') as { iss: string }
  if (!decodedToken) { res.sendStatus(401); return }

  const user = await userService.getUserByUsername(decodedToken.iss)
  if (!user) { res.sendStatus(401); return }
  res.locals.user = user
  next()
} )

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
