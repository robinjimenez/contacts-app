import create from "zustand"
import { persist } from "zustand/middleware"
import { Contact, Literal, User } from "~/types"
import literals from "../data/literals.json"

interface storeState {
  selectedContact: Contact | null
  selectContact: (id: string) => void
  literals: Record<string, Literal>
  setLiterals: () => void
  contacts: Contact[]
  fetchContacts: (user: User & { _id: string }) => void
  setContacts: (contacts: Contact[]) => void
  user: User | null
  setUser: (user: User) => void
  language: string
  setLanguage: (lang: string) => void
  contactMode: "VIEW" | "CREATE"
  setContactMode: (mode: "VIEW" | "CREATE") => void
}

const fetchLiterals = async () => {
  return literals
}

export const useStore = create<storeState>()(
  persist(
    (set, get) => ({
      selectedContact: null,
      selectContact: (id) => {
        const contact = get().contacts.find((contact) => contact._id === id)
        set({ selectedContact: contact })
      },
      literals: {},
      setLiterals: async () => {
        const literals = await fetchLiterals()
        set({ literals: await literals })
      },
      contacts: [],
      fetchContacts: async (user: User & { _id: string }) => {
        const contactsRes = await fetch("/api/contacts/user/" + user._id)
        const contacts = await contactsRes.json()

        set({ contacts: contacts })
      },
      setContacts: (contacts: Contact[]) => {
        set({ contacts: contacts })
      },
      user: null,
      setUser: (user: User) => {
        set({ user: user })
      },
      language: "en",
      setLanguage: (lang: string) => {
        set({ language: lang })
      },
      contactMode: "VIEW",
      setContactMode: (mode: "VIEW" | "CREATE") => {
        set({ contactMode: mode })
      },
    }),
    {
      name: "contacts-storage",
      getStorage: () => sessionStorage,
    }
  )
)
