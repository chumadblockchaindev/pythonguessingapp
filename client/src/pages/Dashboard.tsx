import { useState } from "react"
import DashboardNavbar from "../components/DashboardNavbar"
import { FaHome, FaPoll, FaRegFileAlt } from "react-icons/fa";
import DashboardSidebar from "../components/DashboardSidebar";
import { Navigate, Outlet } from 'react-router-dom';
import { MdAccountCircle, MdSettings } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

const menu:{ url: string; name: string; image: React.ReactNode }[] = [
  {
    "url": "/dashboard/gameplay",
    "name": "Game Play",
    "image": <FaHome className="inline-block w-6 h-6 mr-2 -mt-2"  />
  },
  {
    "url": "/dashboard/leaderboard",
    "name": "Leaderboard",
    "image": <FaRegFileAlt className="inline-block w-6 h-6 mr-2 -mt-2" />
  },
  {
    "url": "/dashboard/history",
    "name": "History",
    "image": <FaPoll className="inline-block w-6 h-6 mr-2 -mt-2" />
  },
  {
    "url": "/dashboard/profile",
    "name": "Profile",
    "image": <MdAccountCircle className="inline-block w-6 h-6 mr-2 -mt-2" />
  },
  {
    "url": "/dashboard/settings",
    "name": "Settings",
    "image": <MdSettings className="inline-block w-6 h-6 mr-2 -mt-2" />
  },
]

const Dashboard = () => {
  const[sidebarToggle, setSidebarToggle] = useState(false)
  const {isAuthenticated} = useAuth()

  return (
    <div className='w-full'>
      <DashboardNavbar sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle}/>
      <DashboardSidebar sidebarToggle={sidebarToggle} menu={menu} />
      <div className={`${sidebarToggle && "md:ml-72"} mt-4 ml-4`}>
        {isAuthenticated ? <Outlet /> : <Navigate to="/login" /> }
      </div>
    </div>
  )
}

export default Dashboard