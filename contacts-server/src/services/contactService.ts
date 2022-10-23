import { Types } from "mongoose"
import { addContactQuery, deleteContactQuery, getUserContactsQuery } from "../models"
import { Contact, User } from "../types"

const createContact = async (user: User & { _id: Types.ObjectId }, contact: Contact) => {
  try {
    contact.owner = user._id.toString()
    return await addContactQuery(contact)
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const editContact = async (user, contact) => {
  try {
    return //await contactDb(user, content)
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

const getContact = async (user, id) => {
  try {
    return //await contactDb(user, id)
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const getAllUserContacts = async (id: string) => {
  try {
    
    const res =  await getUserContactsQuery(id)
    console.log("🚀 ~ file: contactService.ts  line 42 ~ getAllUserContacts ~ res", res)
    return res
  } catch(e: any) {
    throw new Error(e.message)
  }
}

export default {
  createContact,
  editContact,
  deleteContact,
  getContact,
  getAllUserContacts,
}