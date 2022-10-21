import express from 'express'

import { contact } from '../controllers'

const router = express.Router()

router.post('/contacts', contact.addContact)
router.patch('/contacts', contact.editContact)
router.delete('/contacts', contact.deleteContact)
router.get('/contacts', contact.getAllUserContacts)
router.get('/contacts/:id', contact.getContact)

export default router