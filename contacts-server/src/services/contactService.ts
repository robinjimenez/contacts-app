// @ts-nocheck
import { addContactQuery, deleteContactQuery, getUserContactsQuery, getContactByEmailQuery, getContactByIdQuery, editContactQuery } from "../models"
import { Contact, ContactDataEdit, ContactDataFieldType } from "../types"

const createContact = async (userId: string, contact: Contact) => {
  try {
    contact.owner = userId
    contact.creationDate = new Date()
    contact.contactEdits = []
    return await addContactQuery(contact)
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const editContact = async (userId: string, id: string, updatedContactData: Partial<Contact>) => {
  try {
    const contact = await getContactById(userId, id.toString())
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

    return await editContactQuery(userId, id, updatedContactData)
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const deleteContact = async (userId: string, id: string) => {
  try {
    return await deleteContactQuery(userId, id)
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const getContactByEmail = async (userId: string, email: string) => {
  try {
    const contact = await getContactByEmailQuery(userId, email)
    return contact.length > 0 ? contact : false
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const getContactById = async (userId: string, id: string) => {
  try {
    const contact = await getContactByIdQuery(userId, id)
    return contact
  } catch(e: any) {
    throw new Error(e.message)
  }
}

const getAllUserContacts = async (userId: string) => {
  try {
    return await getUserContactsQuery(userId)
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