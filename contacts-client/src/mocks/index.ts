import { Contact, User } from "~/types"

export const mockContacts: Contact[] = [
  {
    _id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@doe.com",
    phoneNumber: 123456789,
    contactEdits: [],
    creationDate: new Date(),
  },
  {
    _id: "2",
    firstName: "Robin",
    lastName: "Jiménez",
    email: "robin@robin.com",
    phoneNumber: 123456789,
    contactEdits: [],
    creationDate: new Date(),
  },
  {
    _id: "3",
    firstName: "Mr",
    lastName: "Bean",
    email: "bean@bean.com",
    phoneNumber: 123456789,
    contactEdits: [],
    creationDate: new Date(),
  },
]

export const mockUser: User = {
  _id: "test-id",
  username: "admin",
  email: "test@test.com",
  accessToken: "12341234",
}
