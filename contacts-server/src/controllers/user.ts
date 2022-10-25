import { RequestHandler } from 'express'
import { userService } from '../services'

const getUser: RequestHandler = async (req, res, next) => {
  try {
    if (!process.env.DEFAULT_USER_ID) return
    const user = await userService.getUser(process.env.DEFAULT_USER_ID)
    res.status(200).send(user)
    next()
  } catch(e: unknown) {
    console.log(e)
    res.sendStatus(500) && next()
  }
}

export default {
  getUser
}