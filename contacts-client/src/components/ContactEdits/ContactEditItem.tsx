import { FC } from "react"
import { useStore } from "../../store"
import { ContactEdit } from "~/types"

type Props = {
  contactEdit: ContactEdit
}

const ContactEditItem: FC<Props> = ({ contactEdit }) => {
  const { literals, language } = useStore(({ literals, language }) => ({
    literals,
    language,
  }))
  return (
    <div className="flex flex-col items-center border-b border-b-gray-400 p-4">
      <p className="mb-2 w-full text-xs">
        On {new Date(contactEdit.date).toLocaleString()}
      </p>
      {Object.entries(contactEdit.dataEdits).map(([key, value], index) => {
        return (
          <div className="mt-2 flex w-full flex-col border-b border-b-gray-200">
            <p className="mr-2 text-sm">
              {literals[key.toUpperCase()][language]}:
            </p>
            <p className="text-right">
              <span className="mr-2 line-through opacity-50">
                {value.previousData.toString()}
              </span>
              {value.updatedData.toString()}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default ContactEditItem
