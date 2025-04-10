import { FaBars } from 'react-icons/fa'
import NotificationBell from './NotificationBell';


const DashboardNavbar = ({ sidebarToggle, setSidebarToggle } : { sidebarToggle: boolean, setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>}) => {

return (
    <nav className='bg-gray-800 px-4 py-3 flex justify-between'>
        <div className='flex items-center justify-between text-xl space-x-32'>
            <h2 className='text-white font-semibold'>
                PyGuess
            </h2>
            <FaBars className='text-white me-4  cursor-pointer' onClick={() => setSidebarToggle(!sidebarToggle)}/>
        </div>
        <div className='flex items-center gap-x-5'>
        <NotificationBell />
      </div>
    </nav>
  )
}

export default DashboardNavbar