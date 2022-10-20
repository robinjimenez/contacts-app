export type Contact = {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: number
  contactEdits?: ContactEdit[]
  creationDate: string
}

export type ContactEdit = {
  id: string
  contact: string
  dataEdits: ContactDataEdit[]
  date: string 
}

export type ContactDataEdit = {
  contactEdit: string
  field: string
  previousData: any 
  updatedData: any
}