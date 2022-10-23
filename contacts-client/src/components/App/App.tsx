import { FC, useEffect } from 'react';
import { useStore } from '../../store';
import ContactDetail from '../ContactDetail';
import ContactList from '../ContactList';
import Navbar from '../Navbar/Navbar';

const App: FC = () => {
  const { literals, setLiterals, setContacts } = useStore(({ literals, setLiterals, setContacts }) => {
    return ({ literals, setLiterals, setContacts })
  })

  useEffect(() => {
    // Fetch literals
    setLiterals();
    // API Test

    (async () => {
      try {
        const userRes = await fetch('/api/users')
        const user = await userRes.json()

        const contactsRes = await fetch('/api/contacts/user/' + user._id)
        const contacts = await contactsRes.json()

        setContacts(contacts)
      } catch (err: any) {
        console.log('Error fetching data: ', err)
      }
    })()
    
  }, [])

  return (
    <div className="relative h-screen max-h-screen w-full flex flex-col">
      <div className=''>
        <Navbar />
      </div>
      <div className='flex-grow relative w-full grid sm:grid-cols-12 grid-rows-[100%] overflow-hidden'>
        <div className='hidden sm:block sm:col-span-3 max-h-full'>
          <ContactList />
        </div>
        <div className='sm:col-span-9 bg-blue-100'>
          <ContactDetail />
        </div>
      </div>
    </div>
  );
}

export default App;
