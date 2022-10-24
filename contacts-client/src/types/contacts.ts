export type Contact = {
  _id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: number
  contactEdits?: ContactEdit[]
  creationDate: Date
}

export type ContactEdit = {
  dataEdits: ContactDataEdit[]
  date: Date 
}

export type ContactDataEdit = {
  field: string
  previousData: ContactDataFieldType
  updatedData: ContactDataFieldType
}

export type ContactDataFieldType = string | Date | number