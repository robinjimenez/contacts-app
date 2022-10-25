import { Types } from "mongoose"
import { Contact as ContactType, User } from "../types"
import Contact from "./contact.models"

const getUserContactsQuery = async (id: string) => {
  return await Contact.find({ owner: id })
}

const addContactQuery = async (contact: ContactType) => {
  const newContact = new Contact(contact)
  return await newContact.save()
}

const editContactQuery = async (user: User, id: string, updatedContactData: Partial<ContactType>) => {
  const updateResult = await Contact.updateOne({ _id: id }, updatedContactData)
  return updateResult.modifiedCount
}

const deleteContactQuery = async (user: User, id: string) => {
  return await Contact.findOneAndDelete({ email: 'test@test.com' }, { _id: 1 })
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