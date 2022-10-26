import { FC, useEffect } from "react"
import { useStore } from "../../store"
import ContactCreation from "../ContactCreation"
import ContactDetail from "../ContactDetail"
import ContactList from "../ContactList"
import ModalOverlay from "../ModalOverlay"
import Navbar from "../Navbar/Navbar"

const App: FC = () => {
  const { setLiterals, fetchContacts, contactMode, setSessionData } = useStore(
    ({ setLiterals, fetchContacts, contactMode, setSessionData }) => {
      return {
        setLiterals,
        fetchContacts,
        contactMode,
        setSessionData,
      }
    }
  )

  useEffect(() => {
    ;(async () => {
      // Fetch literals
      await setLiterals()

      try {
        const response = await fetch("/api/users", { method: "POST" })
        const accessToken = await response.json()
        await setSessionData(accessToken.token)

        fetchContacts()
      } catch (err: unknown) {
        console.log("Error fetching data: ", err)
      }
    })()
  }, [])

  return (
    <div className="relative flex w-full flex-col sm:h-screen sm:max-h-screen">
      <div className="">
        <Navbar />
      </div>
      <div className="grid-rows-[1fr 9fr] relative grid w-full flex-grow overflow-hidden sm:grid-cols-12 sm:grid-rows-[100%]">
        <div className="col-span-12 sm:col-span-3 sm:block sm:max-h-full">
          <ContactList />
        </div>
        <div className="col-span-12 bg-blue-100 sm:col-span-9">
          {contactMode === "CREATE" ? <ContactCreation /> : <ContactDetail />}
        </div>
      </div>
      <ModalOverlay />
    </div>
  )
}

export default App
