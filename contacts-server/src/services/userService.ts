import { Types } from "mongoose"
import { addUserQuery, getUserQuery } from "../models"
import { User } from "../types"

const registerUser = async (user: User) => {
  try {
    return await addUserQuery(user)
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

export default {
  registerUser,
  getUser,
}