
import { Link } from "react-router-dom";

const DashboardSidebar = ({ sidebarToggle, menu } : { sidebarToggle: boolean, menu: Array<{name: string, url:string, image: React.ReactNode}> }) => {
  
    return (
    <div className={sidebarToggle ? `w-64 bg-gray-800 fixed h-full px-4 py-2`: 'hidden'}>
        <div className="my-2 mb-4">
            <div className='dash-header'>
                <h1 className='text-xl text-white font-bold'>Dashboard</h1>
            </div>
            <hr className="text-white mt-2"/>
                <ul className='mt-3 text-white font-bold'>
                        {
                            menu.map((values, index) => (
                                <li className="mb-2 rounded hover:shadow hover:bg-blue-500 py-3" key={index}><Link to={values.url} className="px-3" key={index}>
                                    {values.image}
                                {values.name}</Link></li>
                            ))
                        }
                </ul>
                <div>
                <button className='text-white'>
                    
                </button>
           </div>
        </div>
    </div>
  )
}

export default DashboardSidebar