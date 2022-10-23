import mongoose, { Types } from "mongoose";
import { Contact, ContactDataEdit, ContactEdit } from "../types";

const ContactDataEditSchema = new mongoose.Schema<ContactDataEdit>({
  field: String,
  previousData: String,
  updatedData: String
})

const ContactEditSchema = new mongoose.Schema<ContactEdit>({
  dataEdits: [ContactDataEditSchema],
  date: Date
})

const ContactSchema = new mongoose.Schema<Contact>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: Number, required: true },
  contactEdits: [ContactEditSchema],
  owner: { type: Types.ObjectId, required: true },
  creationDate: { type: Date, required: true }
})

const Contact = mongoose.model('Contact', ContactSchema)

export default Contact