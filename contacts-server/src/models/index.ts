import Contact from './contact.models'
import User from './user.models'

import {
  addContactQuery,
  editContactQuery,
  deleteContactQuery,
  getUserContactsQuery
} from './contact'

import {
  addUserQuery,
  getUserQuery
} from './user'

export { Contact, addContactQuery, editContactQuery, deleteContactQuery, User, addUserQuery, getUserQuery, getUserContactsQuery }