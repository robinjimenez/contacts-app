import { FC, useEffect } from "react"
import { useStore } from "../../store"
import ContactCreation from "../ContactCreation/ContactCreation"
import ContactDetail from "../ContactDetail"
import ContactList from "../ContactList"
import Navbar from "../Navbar/Navbar"

const App: FC = () => {
  const { setLiterals, fetchContacts, contactMode, setUser } = useStore(
    ({ setLiterals, fetchContacts, contactMode, setUser }) => {
      return { setLiterals, fetchContacts, contactMode, setUser }
    }
  )

  useEffect(() => {
    ;(async () => {
      // Fetch literals
      await setLiterals()
      // API Test
      try {
        const userRes = await fetch("/api/users")
        const user = await userRes.json()
        setUser(user)

        fetchContacts(user)
      } catch (err: any) {
        console.log("Error fetching data: ", err)
      }
    })()
  }, [])

  return (
    <div className="relative flex h-screen max-h-screen w-full flex-col">
      <div className="">
        <Navbar />
      </div>
      <div className="relative grid w-full flex-grow grid-rows-[100%] overflow-hidden sm:grid-cols-12">
        <div className="hidden max-h-full sm:col-span-3 sm:block">
          <ContactList />
        </div>
        <div className="bg-blue-100 sm:col-span-9">
          {contactMode === "CREATE" ? <ContactCreation /> : <ContactDetail />}
        </div>
      </div>
    </div>
  )
}

export default App
