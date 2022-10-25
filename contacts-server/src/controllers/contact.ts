import { contactService } from '../services'

const addContact = async (req, res, next) => {
  const {user, contact} = req.body
  try {
    const contactWithEmail = await contactService.getContactByEmail(user, contact.email)
    if (contactWithEmail) {
      res.status(400).send({ message: 'EXISTING_CONTACT_EMAIL' })
      next()
      return
    }
    await contactService.createContact(user, contact)
    res.sendStatus(201) // 201 - created
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next()
  }
}

const editContact = async (req, res, next) => {
  const {user, updatedContactData} = req.body
  const { id } = req.params
  try {
    if (updatedContactData.email) {
      const contactWithEmail = await contactService.getContactByEmail(user, updatedContactData.email)
      if (contactWithEmail) {
        res.status(400).send({ message: 'EXISTING_CONTACT_EMAIL' })
        next()
        return
      }
    }
    await contactService.editContact(user, id, updatedContactData)
    res.sendStatus(200)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next()
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
    res.sendStatus(500) && next()
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
    res.sendStatus(500) && next()
  }
}

const getAllUserContacts = async (req, res, next) => {
  const { id } = req.params
  try {
    const contacts = await contactService.getAllUserContacts(id)
    res.status(200).send(contacts)
    next()
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next()
  }
}

export default {
  addContact,
  editContact,
  deleteContact,
  getContact,
  getAllUserContacts
}