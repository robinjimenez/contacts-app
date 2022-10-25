import create from "zustand"
import { persist } from "zustand/middleware"
import { Contact, ContactMode, Literal, User } from "~/types"
import literals from "../data/literals.json"

interface storeState {
  selectedContact: Contact | null
  selectContact: (id: string) => void
  literals: Record<string, Literal>
  setLiterals: () => void
  contacts: Contact[]
  fetchContacts: (user: User & { _id: string }) => Promise<void>
  setContacts: (contacts: Contact[]) => void
  user: User | null
  setUser: (user: User) => void
  language: string
  setLanguage: (lang: string) => void
  contactMode: ContactMode
  setContactMode: (mode: ContactMode) => void
}

const fetchLiterals = async () => {
  return literals
}

export const useStore = create<storeState>()(
  persist(
    (set, get) => ({
      selectedContact: null,
      selectContact: (id) => {
        const contact = get().contacts.find((contact) => {
          return contact._id === id
        })
        console.log("🚀 ~ file: index.ts ~ line 32 ~ contact", contact)

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

        set({ contacts })
      },
      setContacts: (contacts: Contact[]) => {
        set({ contacts })
      },
      user: null,
      setUser: (user: User) => {
        set({ user })
      },
      language: "en",
      setLanguage: (lang: string) => {
        set({ language: lang })
      },
      contactMode: "VIEW",
      setContactMode: (mode: ContactMode) => {
        set({ contactMode: mode })
      },
    }),
    {
      name: "contacts-storage",
      getStorage: () => sessionStorage,
    }
  )
)
