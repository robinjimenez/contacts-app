import { useStore } from "../../store"
import ScrollableList from "../common/ScrollableList"
import ContactListItem from "./ContactListItem"

const ContactList = () => {
  const { contacts } = useStore((state) => ({ contacts: state.contacts }))

  return (
    <ScrollableList heading="Your contacts">
      {contacts.map((contact) => {
        return <ContactListItem contact={contact} key={contact._id} />
      })}
    </ScrollableList>
  )
}

export default ContactList
