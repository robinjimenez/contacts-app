import { contactService } from '../services'

const addContact = async (req, res, next) => {
  const {user, contact} = req.body
  try {
    await contactService.createContact(user, contact)
    // other service call (or same service, different function can go here)
    // i.e. - await generateBlogpostPreview()
    res.sendStatus(201) // 201 - created
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

const editContact = async (req, res, next) => {
  const {user, contact} = req.body
  try {
    await contactService.editContact(user, contact)
    res.sendStatus(200)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

const deleteContact = async (req, res, next) => {
  const {user, contact} = req.body
  try {
    await contactService.deleteContact(user, contact)
    res.sendStatus(200)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

const getContact = async (req, res, next) => {
  const {user, contact} = req.body
  try {
    await contactService.getContact(user, contact)
    res.sendStatus(200)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

const getAllUserContacts = async (req, res, next) => {
  const {user, contact} = req.body
  try {
    await contactService.getContact(user, contact)
    res.sendStatus(200)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

export default {
  addContact,
  editContact,
  deleteContact,
  getContact,
  getAllUserContacts
}