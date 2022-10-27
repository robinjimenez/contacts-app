/** @jest-environment jsdom */
import App from "../App"
import Navbar from "./Navbar"
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react"

test("renders app title", () => {
  render(<Navbar />)
  const linkElement = screen.getByText(/Contacts app/i)
  expect(linkElement).toBeInTheDocument()
})

test("renders add new button", () => {
  render(<Navbar />)
  const linkElement = screen.getByText(/Add new/i)
  expect(linkElement).toBeInTheDocument()
})

/* test("renders new contact form after add new button click", async () => {
  render(<App />)
  const linkElement = screen.getByText(/Add new/i)
  fireEvent.click(linkElement)
  await waitFor(() => Promise.all([
    screen.getByTestId('firstNameInput'),
    screen.getByTestId('lastNameInput'),
    screen.getByTestId('emailInput'),
    screen.getByTestId('phoneNumberInput')
  ]))
  expect(linkElement).toBeInTheDocument()
})
 */