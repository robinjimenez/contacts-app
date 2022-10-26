import express from 'express'

import { contact, user } from '../controllers'

const router = express.Router()

router.post('/contacts/', contact.addContact)
router.patch('/contacts/:id', contact.editContact)
router.delete('/contacts/:id', contact.deleteContact)
router.get('/contacts/user/', contact.getAllUserContacts)
router.get('/contacts/:id', contact.getContact)

router.post('/users/', user.loginUser)

export default router