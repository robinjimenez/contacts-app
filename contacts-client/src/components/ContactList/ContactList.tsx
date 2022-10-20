import { mockContacts } from "../../mocks";
import ScrollableList from "../common/ScrollableList"
import ContactListItem from "./ContactListItem";

const ContactList = () => {
  return (
    <ScrollableList heading='Your contacts'>
      {mockContacts.map((contact) => {
        return <ContactListItem contact={contact} key={contact.id} />
      })}
    </ScrollableList>
  );
}

export default ContactList
