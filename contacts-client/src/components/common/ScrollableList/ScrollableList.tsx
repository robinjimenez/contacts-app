import { FC, ReactElement } from "react"

type Props = {
  children: ReactElement | ReactElement[]
  heading?: string
  handleClick?: () => void
}

const ScrollableList: FC<Props> = ({
  children,
  heading,
  handleClick = () => null,
}) => {
  return (
    <div className="relative h-full overflow-y-auto" onClick={handleClick}>
      <div className="sticky top-0 z-10 border-b border-b-black bg-white px-4 py-2">
        <h2 className="font-bold">{heading}</h2>
      </div>
      <div className="relative flex flex-col">{children}</div>
    </div>
  )
}

export default ScrollableList
