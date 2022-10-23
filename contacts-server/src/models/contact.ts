import { Contact as ContactType, User } from "../types"
import Contact from "./contact.models"

const getUserContactsQuery = async (id: string) => {
  console.log("🚀 ~ file: contact.ts ~ line 5 ~ getUserContactsQuery ~ id", id)
  return await Contact.find({ owner: id })
}

const addContactQuery = async (contact: ContactType) => {
  const newContact = new Contact(contact)
  newContact.save()
  console.log("Added", contact)

  return 1
}

const editContactQuery = async (user: User, contact: ContactType) => {
  // DB Query goes here
  return 0
}

const deleteContactQuery = async (user: User, id: string) => {
  const contact = await Contact.findOneAndDelete({ email: 'test@test.com' }, { _id: 1 })
  console.log("Removed", contact)
  return -1 
}

export {
  addContactQuery,
  editContactQuery,
  deleteContactQuery,
  getUserContactsQuery
}