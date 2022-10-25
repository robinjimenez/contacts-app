import { FC } from "react"
import { Contact } from "~/types"
import ScrollableList from "../common/ScrollableList"
import ContactEditItem from "./ContactEditItem"

type Props = {
  contact: Contact
}

const ContactEdits: FC<Props> = ({ contact }) => {
  return contact.contactEdits?.length ? (
    <div className="max-w-10 bg-white ">
      <ScrollableList heading="Edit history">
        {contact.contactEdits?.map((edit) => (
          <ContactEditItem contactEdit={edit} />
        )).reverse()}
      </ScrollableList>
    </div>
  ) : null
}

export default ContactEdits
