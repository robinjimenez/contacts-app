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
  dataEdits: Record<string, ContactDataEdit>
  date: Date
}

export type ContactDataEdit = {
  previousData: ContactDataFieldType
  updatedData: ContactDataFieldType
}

export type ContactDataFieldType = string | Date | number