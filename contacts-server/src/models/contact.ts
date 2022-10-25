import { Types } from "mongoose"
import { Contact as ContactType, UserWithId } from "../types"
import Contact from "./contact.models"

const getUserContactsQuery = async (id: string) => {
  return await Contact.find({ owner: id })
}

const addContactQuery = async (contact: ContactType) => {
  const newContact = new Contact(contact)
  return await newContact.save()
}

const editContactQuery = async (user: UserWithId, id: string, updatedContactData: Partial<ContactType>) => {
  const updateResult = await Contact.updateOne({ owner: user._id, _id: id }, updatedContactData)
  return updateResult.modifiedCount
}

const deleteContactQuery = async (user: UserWithId, id: string) => {
  return await Contact.findOneAndDelete({ owner: user._id, _id: id }, { _id: 1 })
}

const getContactByEmailQuery = async (userId: Types.ObjectId, email: string) => {
  return await Contact.find({ owner: userId, email: email })
}

export {
  addContactQuery,
  editContactQuery,
  deleteContactQuery,
  getUserContactsQuery,
  getContactByEmailQuery
}