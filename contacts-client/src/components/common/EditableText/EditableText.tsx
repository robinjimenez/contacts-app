import { ChangeEvent, ChangeEventHandler, FC, useState } from "react"
import { useStore } from "../../../store"

type Props = {
  name: string
  label?: string
  type?: string
  required?: boolean
  initialValue: string
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
  const { literals, language } = useStore(({ literals, language }) => ({
    literals,
    language,
  }))
  const [value, setValue] = useState(initialValue)

  const textStyle = heading
    ? "font-bold text-4xl leading-10"
    : "font-normal text-xl leading-10"

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.currentTarget.value)
    handleChange(ev)
  }

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
                } pb-1 pr-4`}
              >
                {label}
              </label>
            ) : null}
            <input
              type={type}
              id={name}
              required={required}
              className={`${textStyle} flex-grow border-b ${
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
        <p className={`${textStyle} w-full border-b border-b-transparent`}>
          {initialValue}
        </p>
      )}
    </div>
  )
}

export default EditableText
