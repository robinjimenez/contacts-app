import { FC, ReactElement } from "react"

type Props = {
  children: ReactElement[]
  heading?: string
}

const ScrollableList: FC<Props> = ({ children, heading }) => {
  return (
    <div className="relative h-full overflow-y-auto">
      <div className="sticky top-0 z-10 border-b border-b-black bg-white px-4 py-2">
        <h2 className="font-bold">{heading}</h2>
      </div>
      <div className="relative flex flex-col">{children}</div>
    </div>
  )
}

export default ScrollableList
