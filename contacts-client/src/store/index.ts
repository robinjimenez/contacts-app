import create from 'zustand';
import {persist} from 'zustand/middleware';
import {mockContacts} from '../mocks';
import {Contact, Literal} from '~/types';
import literals from '../data/literals.json';

interface storeState {
  selectedContact: Contact | null;
  selectContact: (id: string) => void;
  literals: Record<string, Literal>;
  setLiterals: () => void;
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  language: string;
  setLanguage: (lang: string) => void;
}

const fetchLiterals = async () => {
  return literals;
};

export const useStore = create<storeState>()(
  persist(
    (set, get) => ({
      selectedContact: null,
      selectContact: async (id) => {
        const contact = get().contacts.find(contact => contact._id === id)
        set({selectedContact: contact});
      },
      literals: {},
      setLiterals: async () => {
        const literals = await fetchLiterals();
        set({literals: await literals});
      },
      contacts: [],
      setContacts: async (contacts: Contact[]) => {
        set({contacts: contacts});
      },
      language: 'en',
      setLanguage: async (lang: string) => {
        set({language: lang});
      },
    }),
    {
      name: 'contacts-storage',
      getStorage: () => sessionStorage,
    }
  )
);
