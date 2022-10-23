import { FC, useState } from "react";

type Props = {
  name: string
  label?: string
  initialValue: string
  editable?: boolean
  placeholder?: string
}

const EditableText: FC<Props> = ({ name, label, initialValue, editable = false }) => {
  const [value, setValue] = useState(initialValue)

  return (
    <div className={`${editable ? "mb-1" : ''}`} style={{ transition: 'all 200ms'}}>
    {editable ? (
      <div className="relative flex flex-row w-full justify-center items-end">
        {label ? <label htmlFor={name} className='border-b border-b-black whitespace-nowrap pb-1 pr-4'>{label}</label> : null}
        <input type='text' id={name} className=" flex-grow font-bold text-4xl leading-10 bg-transparent text-center border-b border-b-black" />
      </div>
    ) : (
      <p className="font-bold text-4xl leading-10 border-b-transparent border-b w-full">
        {value}
      </p>)
    }
    </div>

  )
}

export default EditableText;
