import { RequestHandler } from 'express'
import { userService } from '../services'

const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const defaultUser = await userService.getUser(process.env.DEFAULT_USER_ID || '')
    if (!defaultUser) return
    const token = await userService.loginUser(defaultUser)
    res.status(200).send({ token })
    next()
  } catch(e: unknown) {
    console.log(e)
    res.sendStatus(500) && next()
  }
}

export default {
  loginUser
}