// eslint-disable-next-line @typescript-eslint/ban-ts-comment

const validateForm = (data: Record<string, string>) => {
  const errors: Record<string, string> = {}

  Object.entries(data).map((field) => {
    const [type, value] = field
    switch (type) {
      case "firstName":
        if (!value.length) {
          errors.firstName = "NO_FIRSTNAME"
        }
        break
      case "lastName":
        if (!value.length) {
          errors.lastName = "NO_LASTNAME"
        }
        break
      case "email":
        if (!new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "gi").test(value)) {
          errors.email = "INVALID_EMAIL"
        }
        if (!value.length) {
          errors.email = "NO_EMAIL"
        }
        break
      case "phoneNumber":
        // TODO: validate using external library
        if (!new RegExp(/^[0-9]{3,15}$/, "gi").test(value)) {
          errors.phoneNumber = "INVALID_PHONENUMBER"
        }
        if (!value.length) {
          errors.phoneNumber = "NO_PHONENUMBER"
        }
        break
    }
  })

  return errors
}

export default validateForm
