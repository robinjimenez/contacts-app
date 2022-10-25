import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FormEvent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react"
import validateForm from "../../../helpers/validation"

type Props = {
  children(
    handleChange: ChangeEventHandler,
    errors: Record<string, string> | null
  ): ReactElement | ReactElement[]
  handleSubmit: (formData: Record<string, unknown>) => void
}

const Form: FC<Props> = ({ children, handleSubmit }) => {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState<Record<string, string> | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const inputs = formRef.current?.querySelectorAll("input")
    const inputInit: Record<string, unknown> = {}

    if (!inputs) return
    Array.from(inputs).map((input) => {
      inputInit[input.id] = input.value
    })

    setFormData(inputInit)
  }, [])

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!Object.values(formData).length) return
    setErrors(null)

    // Validations
    const errors = validateForm(formData)
    if (Object.entries(errors).length) {
      setErrors(errors)
    }

    // Data submit
    if (!Object.values(errors).length) handleSubmit(formData)

    setFormData({})
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.currentTarget.id]: event.currentTarget.value,
    })
  }

  return (
    <form ref={formRef} onSubmit={handleFormSubmit} className="flex flex-col">
      {children(handleChange, errors)}
    </form>
  )
}

export default Form
