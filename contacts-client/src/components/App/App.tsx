import { FC, useEffect } from 'react';
import { useStore } from '../../store';
import ContactDetail from '../ContactDetail';
import ContactList from '../ContactList';
import Navbar from '../Navbar/Navbar';

const App: FC = () => {
  const { literals, setLiterals } = useStore(({ literals, setLiterals }) => {
    return ({ literals, setLiterals })
  })

  useEffect(() => {
    // Fetch literals
    setLiterals()
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
