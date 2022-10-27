import ContactList from "./ContactList"

import {
  render,
  screen,
} from "@testing-library/react"

import { mockContacts } from "../../mocks"

/* jest.mock("../../store/", () => {
  return jest.fn(() => ({
    contacts: mockContacts,
    selectContact: jest.fn(),
  }))
}) */

test("renders list heading", () => {
  render(<ContactList />)
  const listHeading = screen.getByText(/Your contacts/i)
  expect(listHeading).toBeInTheDocument()
})