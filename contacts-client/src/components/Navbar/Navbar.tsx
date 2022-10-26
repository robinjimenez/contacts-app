import { useStore } from "../../store"
import TextButton from "../common/TextButton/TextButton"

const Navbar = () => {
  const { contactMode, setContactMode } = useStore(
    ({ contactMode, setContactMode }) => ({ contactMode, setContactMode })
  )
  return (
    <div className="flex items-center justify-between border-b border-black p-4">
      <h1 className="text-2xl font-bold">Contacts App</h1>
      <TextButton
        text="Add new"
        handleClick={() => setContactMode("CREATE")}
        variant="PRIMARY"
        enabled={contactMode !== "CREATE"}
      />
    </div>
  )
}

export default Navbar
