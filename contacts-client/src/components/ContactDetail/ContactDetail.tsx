import { FC, useState } from "react"
import { useStore } from "../../store"
import ContactEdits from "../ContactEdits"
import TextButton from "../common/TextButton/TextButton"
import EditableText from "../common/EditableText/EditableText"

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
        <div className="mb-4 flex flex-col items-center">
          <EditableText
            heading
            name="firstName"
            label={literals.FIRSTNAME[language]}
            initialValue={contact.firstName}
            editable={editing}
            handleChange={() => null}
            error={null}
          />
          <EditableText
            heading
            name="lastName"
            label={literals.LASTNAME[language]}
            initialValue={contact.lastName}
            editable={editing}
            handleChange={() => null}
            error={null}
          />
        </div>
        <p className="text-xl">{contact.email}</p>
        <p className="text-xl">{contact.phoneNumber}</p>
        <div className="absolute bottom-0 mb-8 grid grid-cols-2 gap-2">
          {editing ? (
            <TextButton
              text={literals.SAVE[language]}
              uppercase
              handleClick={handleSaveClick}
            />
          ) : (
            <TextButton
              text={literals.EDIT[language]}
              uppercase
              handleClick={handleEditClick}
            />
          )}
          <TextButton
            text={literals.DELETE[language]}
            variant="DANGER"
            uppercase
          />
        </div>
      </div>

      <ContactEdits />
    </div>
  ) : (
    <EmptyContactDetail />
  )
}

export default ContactDetail
