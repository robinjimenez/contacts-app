import { FC } from "react"
import { useStore } from "../../store"

type Props = {
  creationDate: Date
}

const ContactCreationItem: FC<Props> = ({ creationDate }) => {
  const { literals, language } = useStore(({ literals, language }) => ({
    literals,
    language,
  }))
  return (
    <div className="flex flex-col items-center border-b border-b-gray-400 p-4">
      <p className="mb-2 w-full">{literals.CREATED_ON[language]}</p>
      <p className="mb-2 w-full">{new Date(creationDate).toLocaleString()}</p>
    </div>
  )
}

export default ContactCreationItem
