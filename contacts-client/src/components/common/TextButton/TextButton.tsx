import { FC } from "react"

type Props = {
  text: string
  enabled?: boolean
  uppercase?: boolean
  bold?: boolean
  variant?: "PRIMARY" | "DANGER" | "DEFAULT"
  handleClick?: () => void
}

const TextButton: FC<Props> = ({
  text,
  enabled = true,
  uppercase = false,
  bold = false,
  variant = "DEFAULT",
  handleClick = () => null,
}) => {
  return (
    <button
      type="button"
      disabled={!enabled}
      className={`${variant === "DANGER" ? "text-red-500" : ""} ${
        variant === "PRIMARY" ? "text-blue-500" : ""
      } ${uppercase ? "uppercase" : ""} ${bold ? "font-bold" : ""} ${
        enabled ? "cursor-pointer" : "cursor-default opacity-50"
      } hover:opacity-75`}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default TextButton
