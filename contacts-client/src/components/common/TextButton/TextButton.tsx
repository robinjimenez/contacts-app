import { FC } from "react";

type Props = {
  text: string
  uppercase?: boolean
  variant?: 'PRIMARY' | 'DANGER' | 'DEFAULT'
  handleClick?: () => void
}

const TextButton: FC<Props> = ({ text, uppercase = false, variant = 'DEFAULT', handleClick = () => {} }) => {
  return (
    <button
      type="button"
      className={`${variant === 'DANGER' ? 'text-red-500' : ''} ${variant === 'PRIMARY' ? 'text-blue-500' : ''} ${uppercase ? 'uppercase' : ''}`}
      onClick={handleClick}
    >
      {text}
    </button>
  )
}

export default TextButton;
