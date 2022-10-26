import jwt from 'jsonwebtoken'
import { addUserQuery, getUserByUsernameQuery, getUserQuery } from "../models"
import { User } from "../types"

const registerUser = async (user: User) => {
  try {
    return await addUserQuery(user)
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const loginUser = async (user: User) => {
  try {
    if (!process.env.PRIVATE_KEY) return
    const token = jwt.sign({ iss: 'admin', exp: Math.floor(Date.now() / 1000) + (60 * 60) * 8 }, process.env.PRIVATE_KEY )
    return token
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const getUser = async (id: string | null) => {
  try {
    return await getUserQuery(id)
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const getUserByUsername = async (username: string) => {
  try {
    return await getUserByUsernameQuery(username)
  } catch(e: any) {
    throw new Error(e.message)
  }
}

export default {
  registerUser,
  loginUser,
  getUser,
  getUserByUsername,
}