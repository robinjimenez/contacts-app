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
}

const fetchContact = async (id: string) => {
  return mockContacts.find((contact) => contact.id === id);
};

const fetchLiterals = async () => {
  return literals;
};

export const useStore = create<storeState>()(
  persist(
    (set, get) => ({
      selectedContact: null,
      selectContact: async (id) => {
        const contact = await fetchContact(id);
        set({selectedContact: await contact});
      },
      literals: {},
      setLiterals: async () => {
        const literals = await fetchLiterals();
        set({literals: await literals});
      },
    }),
    {
      name: 'contacts-storage',
      getStorage: () => sessionStorage,
    }
  )
);
