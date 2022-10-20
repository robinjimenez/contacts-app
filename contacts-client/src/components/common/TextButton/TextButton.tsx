import { FC } from "react";

type Props = {
  text: string
}

const TextButton: FC<Props> = ({ text }) => {
  return (
    <button
      type="button"
    >
      {text}
    </button>
  )
}

export default TextButton;
