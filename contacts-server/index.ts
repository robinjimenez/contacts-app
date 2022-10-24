import * as dotenv from 'dotenv'
import mongoose, { Types } from 'mongoose'
import express from 'express'

import router from './src/routes'
import { contactService, userService } from './src/services'
import { Contact, User as UserType } from './src/types'

dotenv.config()

const port = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use('/api', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    // For now we're using a single user for all contacts
    const defaultUser = await userService.getUser(process.env.DEFAULT_USER_ID)

    if (!defaultUser) throw Error('User could not be found.')

    const defaultContact: Contact = {
      firstName: 'Juan',
      lastName: 'Do',
      email: 'test@test.com',
      creationDate: new Date(),
      phoneNumber: 123123123,
      owner: defaultUser._id.toString()
    }

    // Test calls
    // userService.registerUser(defaultUser)
    // contactService.createContact(defaultUser, defaultContact)
    // setTimeout(() =>  contactService.deleteContact(defaultUser, '123'), 1000)
  } catch (err) {
    console.log('Unable to connect to database: ', err)
  }
})()
