export type User = {
  _id: string
  username: string
  email: string
  accessToken: string
}

export type Literal = {
  [language: string]: string
}

export type ContactMode = "VIEW" | "CREATE" | "EDIT"
