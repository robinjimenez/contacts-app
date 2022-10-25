// @ts-nocheck
import { Types } from "mongoose"
import { addContactQuery, deleteContactQuery, getUserContactsQuery, getContactByEmailQuery, getContactByIdQuery, editContactQuery } from "../models"
import { Contact, ContactDataEdit, ContactDataFieldType, ContactEdit, UserWithId } from "../types"

const createContact = async (user: UserWithId, contact: Contact) => {
  try {
    contact.owner = user._id.toString()
    contact.creationDate = new Date()
    contact.contactEdits = []
    return await addContactQuery(contact)
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const editContact = async (user: UserWithId, id: Types.ObjectId, updatedContactData: Partial<Contact>) => {
  try {
    const contact = await getContactById(user, id.toString())
    if (!contact) throw Error("Contact not found.")
    if (!contact.contactEdits) contact.contactEdits = []

    const dataEdits: Record<string, ContactDataEdit> = {}
    Object.entries(updatedContactData).map(([key, val]) => {
      const previousData: ContactDataFieldType = contact[key]
      dataEdits[key] = {
        previousData,
        updatedData: val
      }
    })

    updatedContactData.contactEdits = [...contact.contactEdits, {
      date: new Date(),
      dataEdits
    }]

    return await editContactQuery(user, id, updatedContactData)
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const deleteContact = async (user: UserWithId, id: Types.ObjectId) => {
  try {
    return await deleteContactQuery(user, id)
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const getContactByEmail = async (user: UserWithId, email: string) => {
  try {
    const contact = await getContactByEmailQuery(user._id, email)
    return contact.length > 0 ? contact : false
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const getContactById = async (user: UserWithId, id: string) => {
  try {
    const contact = await getContactByIdQuery(user._id, id)
    return contact
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const getAllUserContacts = async (id: Types.ObjectId) => {
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
  getContactById,
  getAllUserContacts,
}