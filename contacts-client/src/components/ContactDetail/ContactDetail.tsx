import { ChangeEventHandler, FC, useState } from "react"
import { useStore } from "../../store"
import ContactEdits from "../ContactEdits"
import TextButton from "../common/TextButton/TextButton"
import EditableText from "../common/EditableText/EditableText"
import Form from "../common/Form/Form"

const EmptyContactDetail: FC = () => {
  const { literals, language } = useStore(({ literals, language }) => ({
    literals,
    language,
  }))

  return (
    <div className="flex h-full items-center justify-center bg-gray-200">
      <p>{literals.SELECT_CONTACT?.[language]}</p>
    </div>
  )
}

const ContactDetail: FC = () => {
  const { literals, contact, language } = useStore(
    ({ selectedContact, literals, language }) => ({
      contact: selectedContact,
      literals,
      language,
    })
  )
  const [editing, setEditing] = useState(false)

  const handleEditClick = () => {
    setEditing(true)
  }

  const handleSaveClick = () => {
    setEditing(false)
  }

  const handleSubmit = (formData: Record<string, unknown>) => {
    console.log(formData)
  }

  return contact ? (
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
                <div className="mb-4">
                  <EditableText
                    name="firstName"
                    heading
                    label={literals.FIRSTNAME[language]}
                    initialValue={contact?.firstName}
                    editable={editing}
                    required
                    handleChange={handleChange}
                    error={errors?.["firstName"] || null}
                  />
                  <EditableText
                    name="lastName"
                    heading
                    label={literals.LASTNAME[language]}
                    initialValue={contact?.lastName}
                    editable={editing}
                    required
                    handleChange={handleChange}
                    error={errors?.["lastName"] || null}
                  />
                </div>
                <EditableText
                  name="email"
                  type="email"
                  label={literals.EMAIL[language]}
                  initialValue={contact?.email}
                  editable={editing}

                  required
                  handleChange={handleChange}
                  error={errors?.["email"] || null}
                />
                <EditableText
                  name="phoneNumber"
                  label={literals.PHONENUMBER[language]}
                  initialValue={contact?.phoneNumber}
                  editable={editing}
                  required
                  handleChange={handleChange}
                  error={errors?.["phoneNumber"] || null}
                />
              </div>
              <div className="absolute bottom-0 mb-8 grid grid-cols-2 gap-2">
                {editing ? (
                  <TextButton
                    text={literals.SAVE[language]}
                    uppercase
                    variant="PRIMARY"
                    bold
                    handleClick={handleSaveClick}
                  />
                ) : (
                  <TextButton
                    text={literals.EDIT[language]}
                    uppercase
                    bold
                    variant="PRIMARY"
                    handleClick={handleEditClick}
                  />
                )}
                <TextButton
                  text={literals.DELETE[language]}
                  variant="DANGER"
                  uppercase
                  bold
                />
              </div>
            </div>
          )}
        </Form>
      </div>

      <ContactEdits />
    </div>
  ) : (
    <EmptyContactDetail />
  )
}

export default ContactDetail
