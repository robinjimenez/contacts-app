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

const editContactQuery = async (userId: string, id: Types.ObjectId, updatedContactData: Partial<ContactType>) => {
  const updateResult = await Contact.updateOne({ owner: userId, _id: id }, updatedContactData)
  return updateResult.modifiedCount
}

const deleteContactQuery = async (userId: string, id: Types.ObjectId) => {
  return await Contact.findOneAndDelete({ owner: userId, _id: id }, { _id: 1 })
}

const getContactByIdQuery = async (userId: string, id: string) => {
  return await Contact.findOne({ owner: userId, _id: id })
}

const getContactByEmailQuery = async (userId: string, email: string) => {
  return await Contact.find({ owner: userId, email: email })
}

export {
  addContactQuery,
  editContactQuery,
  deleteContactQuery,
  getUserContactsQuery,
  getContactByIdQuery,
  getContactByEmailQuery
}