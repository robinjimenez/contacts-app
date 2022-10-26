import Contact from './contact.models'
import User from './user.models'

import {
  addContactQuery,
  editContactQuery,
  deleteContactQuery,
  getUserContactsQuery,
  getContactByIdQuery,
  getContactByEmailQuery
} from './contact'

import {
  addUserQuery,
  getUserQuery,
  getUserByUsernameQuery
} from './user'

export { Contact, addContactQuery, editContactQuery, deleteContactQuery, User, addUserQuery, getUserQuery, getUserByUsernameQuery, getUserContactsQuery, getContactByIdQuery, getContactByEmailQuery }