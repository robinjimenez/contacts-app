import { FC } from "react";
import { useStore } from "../../store";
import { mockContacts } from "../../mocks";
import ContactEdits from "../ContactEdits";

type Props = {
}

const ContactDetail: FC<Props> = () => {
  const { contact } = useStore((state) => ({ contact: state.selectedContact }))
  //const contact = mockContacts[0]

  return (
    <div className="bg-gray-200 flex flex-col items-center justify-center h-full">
      <div className="rounded-full bg-black w-[200px] h-[200px] overflow-hidden mb-4">
        <img src='https://www.picsum.photos/400' className="object-cover" alt='contact avatar' />
      </div>
      <p className="font-bold text-2xl">
        {contact?.firstName} {contact?.lastName}
      </p>
      <p className="text-xl">
        {contact?.email}
      </p>
      <p className="text-xl">
        {contact?.phoneNumber}
      </p>
      <ContactEdits />
    </div>
  );
}

export default ContactDetail
