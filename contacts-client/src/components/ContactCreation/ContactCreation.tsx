import { ChangeEventHandler, FC } from "react"
import { useStore } from "../../store"

import ContactEdits from "../ContactEdits"
import EditableText from "../common/EditableText/EditableText"
import Form from "../common/Form/Form"
import Button from "../common/Button/Button"

const ContactCreation: FC = () => {
  const {
    selectContact,
    literals,
    language,
    user,
    setContactMode,
    fetchContacts,
  } = useStore(
    ({
      selectContact,
      literals,
      language,
      user,
      setContactMode,
      fetchContacts,
    }) => ({
      selectContact,
      literals,
      language,
      user,
      setContactMode,
      fetchContacts,
    })
  )

  const handleSubmit = (formData: Record<string, unknown>) => {
    const data = {
      user,
      contact: formData,
    }

    fetch("/api/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.status === 201) {
        alert("Contact created.")
        const data = await res.json()
        console.log("🚀 ~ file: ContactCreation.tsx ~ line 52 ~ handleSubmit ~ data", data)
        if (user) {
          fetchContacts(user).then(() => {
            selectContact(data.id)
            setContactMode("VIEW")
          })
        }
      } else {
        alert("Could not create contact.")
      }
    })
  }

  return (
    <div className="h-full bg-gray-200 ">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="mb-8 h-[200px] w-[200px] overflow-hidden rounded-full bg-black">
          <img
            src="https://www.picsum.photos/400"
            className="object-cover"
            alt="contact avatar"
          />
        </div>
        <Form handleSubmit={handleSubmit}>
          {(
            handleChange: ChangeEventHandler,
            errors: Record<string, string>
          ) => (
            <div className="mb-4 flex flex-col items-center">
              <div className="w-full">
                <EditableText
                  name="firstName"
                  label={literals.FIRSTNAME[language]}
                  initialValue={""}
                  editable
                  required
                  handleChange={handleChange}
                  error={errors?.["firstName"] || null}
                />
                <EditableText
                  name="lastName"
                  label={literals.LASTNAME[language]}
                  initialValue={""}
                  editable
                  required
                  handleChange={handleChange}
                  error={errors?.["lastName"] || null}
                />
                <EditableText
                  name="email"
                  type="email"
                  label={literals.EMAIL[language]}
                  initialValue={""}
                  editable
                  required
                  handleChange={handleChange}
                  error={errors?.["email"] || null}
                />
                <EditableText
                  name="phoneNumber"
                  label={literals.PHONENUMBER[language]}
                  initialValue={""}
                  editable
                  required
                  handleChange={handleChange}
                  error={errors?.["phoneNumber"] || null}
                />
              </div>
              <div className="absolute bottom-0 mb-8">
                <Button
                  text={literals.SAVE[language]}
                  variant="PRIMARY"
                  uppercase
                  isSubmit
                />
              </div>
            </div>
          )}
        </Form>
      </div>

      <ContactEdits />
    </div>
  )
}

export default ContactCreation
