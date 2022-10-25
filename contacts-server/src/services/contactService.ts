import { Types } from "mongoose"
import { addContactQuery, deleteContactQuery, getUserContactsQuery, getContactByEmailQuery, editContactQuery } from "../models"
import { Contact, User } from "../types"

const createContact = async (user: User & { _id: Types.ObjectId }, contact: Contact) => {
  try {
    contact.owner = user._id.toString()
    contact.creationDate = new Date()
    return await addContactQuery(contact)
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const editContact = async (user: User & { _id: Types.ObjectId }, id: string, updatedContactData: Partial<Contact>) => {
  try {
    return await editContactQuery(user, id, updatedContactData)
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const deleteContact = async (user: User, id: string) => {
  try {
    return await deleteContactQuery(user, id)
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const getContactByEmail = async (user: User & { _id: Types.ObjectId }, email: string) => {
  try {
    const contact = await getContactByEmailQuery(user._id, email)
    return contact.length > 0 ? contact : false
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const getAllUserContacts = async (id: string) => {
  try {
    return await getUserContactsQuery(id)
  } catch(e: any) {
    throw new Error(e.message)
  }
}

export default {
  createContact,
  editContact,
  deleteContact,
  getContactByEmail,
  getAllUserContacts,
}