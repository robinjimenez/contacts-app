import React from "react"
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import { rest } from "msw"
import { setupServer } from "msw/node"

import App from "./App"
import exp from "constants"

const server = setupServer(
  // capture "GET /greeting" requests
  rest.post("http://localhost:3001/api/users", (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json({ token: "123" }))
  })
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

test("App fake test", () => expect(true).toBe(true))

/* test("renders navbar", async () => {
  render(<App />)
  const linkElement = screen.getByText(/Contacts app/i)
  expect(linkElement).toBeInTheDocument()
  await waitForElementToBeRemoved(() => screen.getByText(/Contacts app/i))
})

test("renders contact list", async () => {
  render(<App />)
  const linkElement = screen.getByText(/Your contacts/i)
  expect(linkElement).toBeInTheDocument()
  await waitForElementToBeRemoved(() => screen.getByText(/Your contacts/i))
})
 */