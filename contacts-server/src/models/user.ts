import { User as UserType } from "../types"
import User from "./user.models"

const addUserQuery = async (user: any) => {
  user.save()
  console.log("Added", user)

  return 1
}

const getUserQuery = async (id: string | null) => {
  // Only one dummy user for now
  const user = User.findOne({ _id: id })

  return user
}

export {
  addUserQuery,
  getUserQuery,
}