import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'
import { contactService, userService } from '../services'

const addContact: RequestHandler = async (req, res) => {
  const {contact} = req.body
  const { authorization } = req.headers
  try {
    if (!authorization) { res.sendStatus(401); return }

    const token = authorization.split(' ')
    const decodedToken = jwt.verify(token[1], process.env.PRIVATE_KEY || '')
    if (!decodedToken) { res.sendStatus(401); return }

    const user = await userService.getUserByUsername(decodedToken.iss)
    if (!user) { res.sendStatus(401); return }

    const contactWithEmail = await contactService.getContactByEmail(user._id.toString(), contact.email)
    if (contactWithEmail) {
      res.status(400).send({ message: 'EXISTING_CONTACT_EMAIL' })
      return
    }
    const createdContact = await contactService.createContact(user._id.toString(), contact)
    res.status(201).send({ id: createdContact._id }) // 201 - created
  } catch(e: unknown) {
    console.log(e)
    res.sendStatus(500)
  }
}

const editContact: RequestHandler = async (req, res) => {
  const {updatedContactData} = req.body
  const { id } = req.params
  const { authorization } = req.headers
  try {
    if (!authorization) { res.sendStatus(401); return }

    const token = authorization.split(' ')
    const decodedToken = jwt.verify(token[1], process.env.PRIVATE_KEY || '')
    if (!decodedToken) { res.sendStatus(401); return }

    const user = await userService.getUserByUsername(decodedToken.iss)
    if (!user) { res.sendStatus(401); return }

    if (updatedContactData.email) {
      const contactWithEmail = await contactService.getContactByEmail(user._id.toString(), updatedContactData.email)
      if (contactWithEmail) {
        res.status(400).send({ message: 'EXISTING_CONTACT_EMAIL' })
        return
      }
    }
    await contactService.editContact(user._id.toString(), id, updatedContactData)
    res.sendStatus(200)
  } catch(e: unknown) {
    console.log(e)
    res.sendStatus(500)
  }
}

const deleteContact: RequestHandler = async (req, res) => {
  const { id } = req.params
  const { authorization } = req.headers
  try {
    if (!authorization) { res.sendStatus(401); return }

    const token = authorization.split(' ')
    const decodedToken = jwt.verify(token[1], process.env.PRIVATE_KEY || '')
    if (!decodedToken) { res.sendStatus(401); return }

    const user = await userService.getUserByUsername(decodedToken.iss)
    if (!user) { res.sendStatus(401); return }

    await contactService.deleteContact(user._id.toString(), id)
    res.sendStatus(200)
  } catch(e: unknown) {
    console.log(e)
    res.sendStatus(500)
  }
}

const getContact: RequestHandler = async (req, res) => {
  const { id } = req.params
  const { authorization } = req.headers
  try {
    if (!authorization) { res.sendStatus(401); return }

    const token = authorization.split(' ')
    const decodedToken = jwt.verify(token[1], process.env.PRIVATE_KEY || '')
    if (!decodedToken) { res.sendStatus(401); return }

    const user = await userService.getUserByUsername(decodedToken.iss)
    if (!user) { res.sendStatus(401); return }

    const foundContact = await contactService.getContactById(user._id.toString(), id)
    res.sendStatus(200)
  } catch(e: unknown) {
    console.log(e)
    res.sendStatus(500)
  }
}

const getAllUserContacts: RequestHandler = async (req, res) => {
  const { authorization } = req.headers
  try {
    if (!authorization) { res.sendStatus(401); return }

    const token = authorization.split(' ')
    const decodedToken = jwt.verify(token[1], process.env.PRIVATE_KEY || '')
    if (!decodedToken) { res.sendStatus(401); return }

    const user = await userService.getUserByUsername(decodedToken.iss)
    if (!user) { res.sendStatus(401); return }

    const contacts = await contactService.getAllUserContacts(user._id.toString())
    res.status(200).send(contacts)
  } catch(e: unknown) {
    console.log(e)
    res.sendStatus(500)
  }
}

export default {
  addContact,
  editContact,
  deleteContact,
  getContact,
  getAllUserContacts
}