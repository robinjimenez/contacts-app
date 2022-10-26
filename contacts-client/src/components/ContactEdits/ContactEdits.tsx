import { FC, useEffect, useState } from "react"
import { Contact } from "~/types"
import ScrollableList from "../common/ScrollableList"
import ContactCreationItem from "./ContactCreationItem"
import ContactEditItem from "./ContactEditItem"

type Props = {
  contact: Contact
  handleClose: () => void
}

const ContactEdits: FC<Props> = ({ contact, handleClose }) => {
  const edits =
    contact.contactEdits
      ?.map((edit) => <ContactEditItem contactEdit={edit} />)
      .reverse() || []

  return (
    <div className="w-100 relative h-full bg-white sm:w-[20vw]">
      <div className="absolute top-0 right-0 z-[100] mx-2 text-3xl">
        <button
          type="button"
          aria-label="close"
          onClick={handleClose}
          className="hover:opacity-75"
        >
          &times;
        </button>
      </div>
      <ScrollableList heading="Edit history">
        {[
          ...edits,
          <ContactCreationItem creationDate={contact.creationDate} />,
        ]}
      </ScrollableList>
    </div>
  )
}

export default ContactEdits
