import { FC, MouseEvent } from "react"
import { useStore } from "../../store"
import { Contact } from "~/types"

type Props = {
  contact: Contact
}

const ContactListItem: FC<Props> = ({ contact }) => {
  const { selectContact, contactMode, setContactMode } = useStore(
    ({ selectContact, contactMode, setContactMode }) => ({
      selectContact,
      contactMode,
      setContactMode,
    })
  )

  const handleClick = (ev: MouseEvent) => {
    ev?.stopPropagation()
    if (contactMode === "CREATE") {
      const confirmedExit = confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      )
      confirmedExit ? setContactMode("VIEW") : null
    } else {
      setContactMode("VIEW")
    }
    selectContact(contact._id)
  }

  return (
    <div
      className="border-b-gray flex cursor-pointer flex-row items-center border-b p-4 hover:bg-gray-100"
      onClick={handleClick}
    >
      <div className="mr-4 h-10 w-10 overflow-hidden rounded-full bg-gray-200">
        <img
          src="https://www.picsum.photos/100"
          className="object-cover"
          alt="contact avatar"
        />
      </div>
      <p>
        {contact.firstName} {contact.lastName}
      </p>
    </div>
  )
}

export default ContactListItem
