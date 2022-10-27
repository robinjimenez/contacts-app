import jwtDecode, { JwtPayload } from "jwt-decode"
import create from "zustand"
import { persist } from "zustand/middleware"

import { Contact, ContactMode, Literal, SessionData, ModalData } from "~/types"
import literals from "../data/literals.json"

interface storeState {
  selectedContact: Contact | null
  selectContact: (id: string) => void
  literals: Record<string, Literal>
  setLiterals: () => void
  contacts: Contact[]
  fetchContacts: () => Promise<void>
  setContacts: (contacts: Contact[]) => void
  sessionData: SessionData | null
  setSessionData: (token: string) => void
  language: string
  setLanguage: (lang: string) => void
  contactMode: ContactMode
  setContactMode: (mode: ContactMode) => void
  modal: ModalData | null
  setModal: (modal: ModalData | null) => void
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
        set({ selectedContact: contact })
      },
      literals: {},
      setLiterals: async () => {
        const literals = await fetchLiterals()
        set({ literals: await literals })
      },
      contacts: [],
      fetchContacts: async () => {
        if (!get().sessionData?.accessToken) return
        const contactsRes = await fetch("http://localhost:3001/api/contacts/user", {
          headers: {
            Authorization: `Bearer ${get().sessionData?.accessToken}`,
          },
        })
        const contacts = await contactsRes.json()
        set({ contacts })
      },
      setContacts: (contacts: Contact[]) => {
        set({ contacts })
      },
      sessionData: null,
      setSessionData: (token: string) => {
        const decodedToken = jwtDecode<JwtPayload>(token)
        if (!decodedToken.iss) return
        set({
          sessionData: {
            username: decodedToken.iss,
            accessToken: token,
          },
        })
      },
      language: "en",
      setLanguage: (lang: string) => {
        set({ language: lang })
      },
      contactMode: "VIEW",
      setContactMode: (mode: ContactMode) => {
        set({ contactMode: mode })
      },
      modal: null,
      setModal: (modal: ModalData | null) => {
        set({ modal })
      },
    }),
    {
      name: "contacts-storage",
      getStorage: () => sessionStorage,
    }
  )
)
