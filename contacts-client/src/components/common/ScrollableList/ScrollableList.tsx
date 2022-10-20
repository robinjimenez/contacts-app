import { FC, ReactElement } from "react";

type Props = {
  children: ReactElement[]
  heading?: string
}

const ScrollableList: FC<Props> = ({ children, heading }) => {
  return (
    <div className="relative overflow-y-auto h-full">
      <div className='px-4 py-2 bg-white z-10 border-b-black border-b sticky top-0'>
        <h2 className="font-bold">{heading}</h2>
      </div>
      <div className="relative flex flex-col">
        {children}
      </div>
    </div>
  )
}

export default ScrollableList;
