import { Types } from "mongoose"

export type Contact = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: number
  contactEdits?: ContactEdit[]
  creationDate: Date,
  owner?: string
}

export type ContactEdit = {
  dataEdits: Record<string, ContactDataEdit>
  date: Date
}

export type ContactDataEdit = {
  previousData: ContactDataFieldType
  updatedData: ContactDataFieldType
}

export type ContactDataFieldType = String | Date | Number