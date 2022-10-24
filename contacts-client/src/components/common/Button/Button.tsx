import { FC } from "react"

type Props = {
  text: string
  enabled?: boolean
  uppercase?: boolean
  variant?: "PRIMARY" | "DANGER" | "DEFAULT"
  handleClick?: () => void
  isSubmit: boolean
}

const Button: FC<Props> = ({
  text,
  enabled = true,
  uppercase = false,
  variant = "DEFAULT",
  handleClick = () => null,
  isSubmit = false,
}) => {
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      disabled={!enabled}
      className={`rounded-xl px-4 py-2 text-white ${
        variant === "DANGER" ? "bg-red-500" : ""
      } ${variant === "PRIMARY" ? "bg-blue-500" : ""} ${
        uppercase ? "uppercase" : ""
      } ${
        enabled ? "cursor-pointer" : "cursor-default opacity-50"
      } hover:opacity-75`}
      onClick={handleClick || null}
    >
      {text}
    </button>
  )
}

export default Button
