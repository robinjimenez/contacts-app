import { FC } from "react";
import { useStore } from "../../store";
import { Contact } from "~/types";

type Props = {
  contact: Contact
}

const ContactListItem: FC<Props> = ({ contact }) => {
  const { selectContact } = useStore(({ selectContact }) => ({ selectContact }))
  
  const handleClick = () => {
    selectContact(contact._id)
  }
  
  return (
    <div className="p-4 border-b border-b-gray flex flex-row items-center hover:bg-gray-100 cursor-pointer" onClick={handleClick}>
      <div className="rounded-full h-10 w-10 bg-gray-200 mr-4 overflow-hidden">
        <img src='https://www.picsum.photos/100' className="object-cover" alt='contact avatar' />
      </div>
      <p>{contact.firstName} {contact.lastName}</p>
    </div>
  );
}

export default ContactListItem
