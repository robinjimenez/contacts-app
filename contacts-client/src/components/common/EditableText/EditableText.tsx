import { ChangeEvent, ChangeEventHandler, FC, useEffect, useState } from "react"
import { Contact } from "~/types"
import { useStore } from "../../../store"

type Props = {
  name: string
  label?: string
  type?: string
  required?: boolean
  initialValue: string | number
  editable?: boolean
  placeholder?: string
  heading?: boolean
  handleChange: ChangeEventHandler
  error: string | null
}

const EditableText: FC<Props> = ({
  name,
  label,
  type = "text",
  required = false,
  initialValue,
  editable = false,
  heading = false,
  handleChange,
  error,
}) => {
  const { selectedContact, literals, language } = useStore(
    ({ selectedContact, literals, language }) => ({
      selectedContact,
      literals,
      language,
    })
  )
  const [value, setValue] = useState(initialValue)

  const textStyle = heading
    ? "font-bold text-4xl leading-10"
    : "font-normal text-xl leading-normal"

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.currentTarget.value)
    handleChange(ev)
  }

  useEffect(() => {
    if (editable && selectedContact) {
      const contactField = selectedContact[name as keyof Contact]

      if (value !== contactField) setValue(contactField as keyof Contact)
    }
  }, [editable])

  return (
    <div
      className={`${editable ? "mb-1" : ""}`}
      style={{ transition: "all 200ms" }}
    >
      {editable ? (
        <>
          <div className="relative flex w-full flex-row items-end justify-center">
            {label ? (
              <label
                htmlFor={name}
                className={`whitespace-nowrap border-b ${
                  error !== null ? "border-b-red-500" : "border-b-black"
                } pb-1 pr-4 `}
              >
                {label}
              </label>
            ) : null}
            <input
              type={type}
              id={name}
              required={required}
              className={`flex-grow border-b text-xl font-normal leading-10 ${
                error !== null
                  ? "border-b-red-500 text-red-500"
                  : "border-b-black"
              } bg-transparent text-center`}
              onChange={handleInputChange}
              value={value}
            />
          </div>
          {error && literals && language ? (
            <p className="right-0 text-red-500">{literals[error][language]}</p>
          ) : null}
        </>
      ) : (
        <p
          className={`${textStyle} w-full border-b border-b-transparent text-center`}
        >
          {initialValue}
        </p>
      )}
    </div>
  )
}

export default EditableText
