import { userService } from '../services'

const getUser = async (req, res, next) => {
  try {
    const user = await userService.getUser(process.env.DEFAULT_USER_ID)
    res.status(200).send(user)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

export default {
  getUser
}