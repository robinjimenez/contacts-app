import ContactListItem from "./ContactListItem"

import {
  render,
  screen,
} from "@testing-library/react"

import { mockContacts } from "../../mocks"

test("renders contact names", () => {
  render(<ContactListItem contact={mockContacts[0]} />)
  const contactName = screen.getByText(/John Doe/i)
  expect(contactName).toBeInTheDocument()
})

test("renders contact avatar", () => {
  render(<ContactListItem contact={mockContacts[0]} />)
  const contactAvatar = screen.getByTestId("contact-avatar")
  expect(contactAvatar).toBeInTheDocument()
})
