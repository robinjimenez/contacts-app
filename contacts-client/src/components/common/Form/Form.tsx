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
    errors: Record<string, string> | null,
    hasUnsavedChanges: boolean
  ): ReactElement | ReactElement[]
  handleSubmit: (formData: Record<string, unknown>) => void
  isEditing: boolean
}

const Form: FC<Props> = ({ children, handleSubmit, isEditing }) => {
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false)

  const [initialFormValues, setInitialFormValues] = useState<
    Record<string, unknown>
  >({})
  const [errors, setErrors] = useState<Record<string, string> | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    setHasUnsavedChanges(Object.entries(formData).length > 0)
  }, [formData])

  useEffect(() => {
    const inputs = formRef.current?.querySelectorAll("input")
    const inputInit: Record<string, unknown> = {}

    if (!inputs) return
    Array.from(inputs).map((input) => {
      inputInit[input.id] = input.value
    })

    setInitialFormValues(inputInit)
  }, [isEditing])

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

    // Reset form data
    setFormData({})
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // If value is the same as initial, don't submit as changed data

    if (
      Object.values(formData).length &&
      event.currentTarget.value === initialFormValues[event.currentTarget.id]
    ) {
      const updatedFormData = formData
      delete updatedFormData[event.currentTarget.id]
      setFormData(updatedFormData)
      setHasUnsavedChanges(Object.entries(formData).length > 0)
    } else {
      setFormData({
        ...formData,
        [event.currentTarget.id]: event.currentTarget.value,
      })
    }
  }

  return (
    <form ref={formRef} onSubmit={handleFormSubmit} className="flex flex-col">
      {children(handleChange, errors, hasUnsavedChanges)}
    </form>
  )
}

export default Form
