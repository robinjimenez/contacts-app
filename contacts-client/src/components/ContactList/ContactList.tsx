import { useStore } from "../../store"
import ScrollableList from "../common/ScrollableList"
import ContactListItem from "./ContactListItem"

const ContactList = () => {
  const { contacts, selectContact } = useStore((state) => ({
    contacts: state.contacts,
    selectContact: state.selectContact,
  }))

  return (
    <ScrollableList
      heading="Your contacts"
      handleClick={() => selectContact("")}
    >
      {contacts.map((contact) => {
        return <ContactListItem contact={contact} key={contact._id} />
      })}
    </ScrollableList>
  )
}

export default ContactList
