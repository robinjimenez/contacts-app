import { FC, useState } from "react";
import { useStore } from "../../store";
import ContactEdits from "../ContactEdits";
import TextButton from "../common/TextButton/TextButton";
import EditableText from "../common/EditableText/EditableText";

type Props = {
}

const EmptyContactDetail: FC = () => {
  const { literals, language } = useStore(({literals, language}) => ({ literals, language }))
  
  return (
    <div className="bg-gray-200 h-full">
      <p>{literals.SELECT_CONTACT[language]}</p>
    </div>
  )
}

const ContactDetail: FC<Props> = () => {
  const { literals, contact, language } = useStore(({selectedContact, literals, language}) => ({ contact: selectedContact, literals, language }))
  const [editing, setEditing] = useState(false)

  const handleEditClick = () =>  {
    setEditing(true)
  }

  const handleSaveClick = () =>  {
    setEditing(false)
  }

  return contact ? (
    <div className="bg-gray-200 h-full ">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="rounded-full bg-black w-[200px] h-[200px] overflow-hidden mb-4">
          <img src='https://www.picsum.photos/400' className="object-cover" alt='contact avatar' />
        </div>
        <div className="mb-4 flex flex-col items-center">
          <EditableText name='firstName' label={literals.FIRSTNAME[language]} initialValue={contact.firstName} editable={editing} />
          <EditableText name='lastName' label={literals.LASTNAME[language]}  initialValue={contact.lastName} editable={editing} />
        </div>
        <p className="text-xl">
          {contact.email}
        </p>
        <p className="text-xl">
          {contact.phoneNumber}
        </p>
        <div className="grid grid-cols-2 gap-2 absolute bottom-0 mb-8">
          {editing ? (
            <TextButton text={literals.SAVE[language]} uppercase handleClick={handleSaveClick} />
          ) : (
            <TextButton text={literals.EDIT[language]} uppercase handleClick={handleEditClick} />
          )}
          <TextButton text={literals.DELETE[language]} variant='DANGER' uppercase />
        </div>
      </div>

      <ContactEdits />
    </div>
  ) : (
    <EmptyContactDetail />
  )
}

export default ContactDetail
