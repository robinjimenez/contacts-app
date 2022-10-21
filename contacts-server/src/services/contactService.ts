//const { contactDb } = require('../db')

const createContact = async (user, contact) => {
  try {
    return //await contactDb(user, content)
  } catch(e) {
    throw new Error(e.message)
  }
}

const editContact = async (user, contact) => {
  try {
    return //await contactDb(user, content)
  } catch(e) {
    throw new Error(e.message)
  }
}

const deleteContact = async (user, contact) => {
  try {
    return //await contactDb(user, content)
  } catch(e) {
    throw new Error(e.message)
  }
}

const getContact = async (user, id) => {
  try {
    return //await contactDb(user, id)
  } catch(e) {
    throw new Error(e.message)
  }
}

const getAllUserContacts = async (user) => {
  try {
    return //await contactDb(user)
  } catch(e) {
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