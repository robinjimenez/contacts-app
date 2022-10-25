import { RequestHandler } from 'express'
import { contactService } from '../services'

const addContact: RequestHandler = async (req, res, next) => {
  const {user, contact} = req.body
  try {
    const contactWithEmail = await contactService.getContactByEmail(user, contact.email)
    if (contactWithEmail) {
      res.status(400).send({ message: 'EXISTING_CONTACT_EMAIL' })
      next()
      return
    }
    const createdContact = await contactService.createContact(user, contact)
    res.status(201).send({ id: createdContact._id }) // 201 - created
    next()
  } catch(e: unknown) {
    console.log(e)
    res.sendStatus(500) && next()
  }
}

const editContact: RequestHandler = async (req, res, next) => {
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
  } catch(e: unknown) {
    console.log(e)
    res.sendStatus(500) && next()
  }
}

const deleteContact: RequestHandler = async (req, res, next) => {
  const { user } = req.body
  const { id } = req.params

  try {
    await contactService.deleteContact(user, id)
    res.sendStatus(200)
    next()
  } catch(e: unknown) {
    console.log(e)
    res.sendStatus(500) && next()
  }
}

const getContact: RequestHandler = async (req, res, next) => {
  const { user } = req.body
  const { id } = req.params

  try {
    const foundContact = await contactService.getContactById(user, id)
    res.sendStatus(200)
    next()
  } catch(e: unknown) {
    console.log(e)
    res.sendStatus(500) && next()
  }
}

const getAllUserContacts: RequestHandler = async (req, res, next) => {
  const { id } = req.params
  try {
    const contacts = await contactService.getAllUserContacts(id)
    res.status(200).send(contacts)
    next()
  } catch(e: unknown) {
    console.log(e)
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