import { ChangeEventHandler, FC } from "react"
import { useStore } from "../../store"

import EditableText from "../common/EditableText/EditableText"
import Form from "../common/Form/Form"
import Button from "../common/Button/Button"

const ContactCreation: FC = () => {
  const {
    selectContact,
    literals,
    language,
    setContactMode,
    fetchContacts,
    sessionData,
    setModal,
  } = useStore(
    ({
      selectContact,
      literals,
      language,
      setContactMode,
      fetchContacts,
      sessionData,
      setModal,
    }) => ({
      selectContact,
      literals,
      language,
      setContactMode,
      fetchContacts,
      sessionData,
      setModal,
    })
  )

  const handleSubmit = (formData: Record<string, unknown>) => {
    const data = {
      contact: formData,
    }

    fetch("/api/contacts", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionData?.accessToken}`,
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      if (res.status === 201) {
        setModal({
          message: "CONTACT_CREATION_SUCCESS",
          title: "CONTACT_CREATION_SUCCESS_TITLE",
        })

        const data = await res.json()
        fetchContacts().then(() => {
          selectContact(data.id)
          setContactMode("VIEW")
        })
      } else {
        setModal({
          message: "CONTACT_CREATION_ERROR",
          title: "CONTACT_CREATION_ERROR_TITLE",
        })
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
        <Form handleSubmit={handleSubmit} isEditing={true}>
          {(
            handleChange: ChangeEventHandler,
            errors: Record<string, string>,
            hasUnsavedChanges: boolean
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
                  enabled={hasUnsavedChanges}
                  text={literals.SAVE[language]}
                  variant={hasUnsavedChanges ? "PRIMARY" : "DEFAULT"}
                  uppercase
                  isSubmit={hasUnsavedChanges}
                />
              </div>
            </div>
          )}
        </Form>
      </div>
    </div>
  )
}

export default ContactCreation
